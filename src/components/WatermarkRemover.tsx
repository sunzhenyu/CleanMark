'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { removeWatermarkFromImage } from '@/lib/watermark-remover/sdk/browser';

export default function WatermarkRemover() {
  const t = useTranslations('home');
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeWidth, setResizeWidth] = useState<string>('');
  const [resizeHeight, setResizeHeight] = useState<string>('');
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = async (e) => {
        img.src = e.target?.result as string;
        setImage(img.src);

        img.onload = async () => {
          try {
            setOriginalDimensions({ width: img.width, height: img.height });
            const result = await removeWatermarkFromImage(img);

            // Handle both Canvas and OffscreenCanvas
            let dataUrl: string;
            if (result.canvas instanceof HTMLCanvasElement) {
              dataUrl = result.canvas.toDataURL('image/png');
            } else {
              // OffscreenCanvas - convert to blob then to data URL
              const blob = await result.canvas.convertToBlob({ type: 'image/png' });
              dataUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });
            }

            setProcessedImage(dataUrl);
          } catch (error) {
            console.error('Error processing image:', error);
            alert('Failed to process image. Please try another image.');
          } finally {
            setIsProcessing(false);
          }
        };
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading file:', error);
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDownload = async () => {
    if (!processedImage) return;

    const width = parseInt(resizeWidth);
    const height = parseInt(resizeHeight);

    // No resize - direct download
    if (!width && !height) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'cleanmark-removed.png';
      link.click();
      return;
    }

    // Resize before download
    const img = new Image();
    img.src = processedImage;
    await new Promise((resolve) => { img.onload = resolve; });

    const aspectRatio = img.width / img.height;
    let targetWidth = width || 0;
    let targetHeight = height || 0;

    // Calculate missing dimension
    if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cleanmark-removed.png';
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handleReset = () => {
    setImage(null);
    setProcessedImage(null);
    setResizeWidth('');
    setResizeHeight('');
    setOriginalDimensions(null);
  };

  if (processedImage) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src={processedImage}
            alt="Processed"
            className="max-w-full h-auto mx-auto rounded"
          />
        </div>

        {/* Resize controls */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {t('gemini.resize.title')}
          </h3>
          {originalDimensions && (
            <p className="text-xs text-gray-500 mb-3">
              {t('gemini.resize.original')}: {originalDimensions.width} × {originalDimensions.height}px
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">
                {t('gemini.resize.width')} (px)
              </label>
              <input
                type="number"
                value={resizeWidth}
                onChange={(e) => setResizeWidth(e.target.value)}
                placeholder={t('gemini.resize.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">
                {t('gemini.resize.height')} (px)
              </label>
              <input
                type="number"
                value={resizeHeight}
                onChange={(e) => setResizeHeight(e.target.value)}
                placeholder={t('gemini.resize.placeholder')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('gemini.resize.placeholder')}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            {t('download')}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition"
          >
            {t('tryAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative border-2 border-dashed rounded-lg p-12 transition ${
        isDragging
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {isProcessing ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">{t('processing')}</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-lg text-gray-700 mb-2">{t('upload.title')}</p>
          <p className="text-sm text-gray-500 mb-4">{t('upload.or')}</p>
          <label className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition cursor-pointer">
            {t('upload.browse')}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400 mt-4">{t('upload.supported')}</p>
        </div>
      )}
    </div>
  );
}
