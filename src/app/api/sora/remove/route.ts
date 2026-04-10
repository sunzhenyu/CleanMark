import { NextRequest, NextResponse } from 'next/server';

// HF Spaces backend URL — set HF_SPACES_URL env var to your Space's API URL
// e.g. https://your-username-sorawatermarkcleaner.hf.space
const HF_SPACES_URL = process.env.HF_SPACES_URL;
const HF_SPACES_API_BASE = HF_SPACES_URL ? `${HF_SPACES_URL}/api/v1` : null;

export async function POST(request: NextRequest) {
  try {
    if (!HF_SPACES_API_BASE) {
      return NextResponse.json(
        { error: 'Sora watermark removal service not configured. Please set HF_SPACES_URL.' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 20MB.' },
        { status: 400 }
      );
    }

    // Submit task to HF Spaces FastAPI backend
    const uploadForm = new FormData();
    uploadForm.append('video', file, file.name);

    const submitResponse = await fetch(
      `${HF_SPACES_API_BASE}/submit_remove_task?cleaner_type=lama`,
      { method: 'POST', body: uploadForm }
    );

    if (!submitResponse.ok) {
      const error = await submitResponse.text();
      console.error('HF Spaces submit error:', error);
      return NextResponse.json(
        { error: `Failed to submit task: ${error}` },
        { status: submitResponse.status }
      );
    }

    const { task_id } = await submitResponse.json();

    // Poll for completion (max 5 minutes, 5s intervals)
    const maxAttempts = 60;
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000));

      const statusResponse = await fetch(
        `${HF_SPACES_API_BASE}/get_results?remove_task_id=${task_id}`
      );

      if (!statusResponse.ok) continue;

      const result = await statusResponse.json();

      if (result.status === 'FINISHED') {
        const downloadUrl = `${HF_SPACES_API_BASE}/download/${task_id}`;
        return NextResponse.json({ success: true, output: downloadUrl });
      }

      if (result.status === 'ERROR') {
        return NextResponse.json(
          { error: result.error_message || 'Processing failed' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ error: 'Processing timeout' }, { status: 504 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
