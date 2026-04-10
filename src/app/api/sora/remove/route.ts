import { NextRequest, NextResponse } from 'next/server';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_MODEL_VERSION = '7b636d39f482f129dfa3429fdc7c5c2d4f4ef36e4cbc6d919b701c1d39162797';

export async function POST(request: NextRequest) {
  try {
    if (!REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'Replicate API token not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file size (20MB limit)
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 20MB.' },
        { status: 400 }
      );
    }

    // Convert file to base64 data URI
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'video/mp4';
    const dataUri = `data:${mimeType};base64,${base64}`;

    // Call Replicate API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: REPLICATE_MODEL_VERSION,
        input: {
          video: dataUri,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Replicate API error:', error);
      console.error('Response status:', response.status);
      return NextResponse.json(
        { error: `Failed to start processing: ${error}` },
        { status: response.status }
      );
    }

    const prediction = await response.json();

    // Poll for completion
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max (5s intervals)

    while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${result.id}`,
        {
          headers: {
            'Authorization': `Token ${REPLICATE_API_TOKEN}`,
          },
        }
      );

      if (!statusResponse.ok) {
        break;
      }

      result = await statusResponse.json();
      attempts++;
    }

    if (result.status === 'failed') {
      return NextResponse.json(
        { error: result.error || 'Processing failed' },
        { status: 500 }
      );
    }

    if (result.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Processing timeout' },
        { status: 504 }
      );
    }

    return NextResponse.json({
      success: true,
      output: result.output,
      logs: result.logs || '',
    });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
