'use client';

import { useState, useRef, useEffect } from 'react';

export default function ManualEraser() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        drawImageOnCanvas(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const drawImageOnCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsErasing(true);
    erase(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isErasing) return;
    erase(e);
  };

  const handleMouseUp = () => {
    setIsErasing(false);
  };

  const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Sample background from surrounding area
    const samples: [number, number, number][] = [];
    for (let dy = -brushSize * 2; dy <= brushSize * 2; dy += 5) {
      for (let dx = -brushSize * 2; dx <= brushSize * 2; dx += 5) {
        const sx = Math.floor(x + dx);
        const sy = Math.floor(y + dy);
        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > brushSize && dist < brushSize * 2) {
            const idx = (sy * canvas.width + sx) * 4;
            samples.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
          }
        }
      }
    }

    if (samples.length === 0) return;

    samples.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
    const [bgR, bgG, bgB] = samples[Math.floor(samples.length / 2)];

    // Erase with circular brush
    for (let dy = -brushSize; dy <= brushSize; dy++) {
      for (let dx = -brushSize; dx <= brushSize; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > brushSize) continue;

        const px = Math.floor(x + dx);
        const py = Math.floor(y + dy);
        if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;

        const idx = (py * canvas.width + px) * 4;
        const noise = Math.floor(Math.random() * 7) - 3;
        pixels[idx] = Math.max(0, Math.min(255, bgR + noise));
        pixels[idx + 1] = Math.max(0, Math.min(255, bgG + noise));
        pixels[idx + 2] = Math.max(0, Math.min(255, bgB + noise));
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'erased-image.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const handleReset = () => {
    if (image) drawImageOnCanvas(image);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {!image ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-12 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-gray-600">Click to upload image</div>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium">Brush Size: {brushSize}px</label>
              <input
                type="range"
                min="5"
                max="100"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="flex-1"
              />
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-auto cursor-crosshair"
                style={{ display: 'block', maxWidth: '100%' }}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Reset
              </button>
              <button onClick={handleDownload} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                New Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
