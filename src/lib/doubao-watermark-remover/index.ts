/**
 * Doubao Watermark Remover
 * Removes "豆包AI生成" watermark from Doubao-generated images
 */

interface WatermarkConfig {
  logoWidth: number;
  logoHeight: number;
  marginRight: number;
  marginBottom: number;
}

interface Position {
  x: number;
  y: number;
}

const ALPHA_THRESHOLD = 0.002;
const MAX_ALPHA = 0.99;
const LOGO_VALUE = 255;
const ALPHA_NOISE_FLOOR = 3 / 255;

/**
 * Detect watermark configuration based on image size
 */
function detectWatermarkConfig(width: number, height: number): WatermarkConfig {
  if (width > 1024 || height > 1024) {
    const scale = Math.min(width, height) / 288;
    const oldHeight = 20 * scale * 1.25;
    const newHeight = 20 * scale * 0.83;
    const heightDiff = oldHeight - newHeight;
    return {
      logoWidth: Math.floor(120 * scale * 0.53),
      logoHeight: Math.floor(newHeight),
      marginRight: Math.floor(10 * scale),
      marginBottom: Math.floor(5 + heightDiff), // 补偿高度差
    };
  }
  return {
    logoWidth: 40,
    logoHeight: 10,
    marginRight: 8,
    marginBottom: 8,
  };
}

/**
 * Calculate watermark position (bottom-right corner)
 */
function calculatePosition(
  width: number,
  height: number,
  config: WatermarkConfig
): Position {
  return {
    x: width - config.marginRight - config.logoWidth,
    y: height - config.marginBottom - config.logoHeight,
  };
}

/**
 * Load and resize alpha map
 */
async function loadAlphaMap(
  logoWidth: number,
  logoHeight: number
): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = logoWidth;
      canvas.height = logoHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, logoWidth, logoHeight);

      const imageData = ctx.getImageData(0, 0, logoWidth, logoHeight);
      const alphaMap: number[] = [];

      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const maxChannel = Math.max(r, g, b);
        alphaMap.push(maxChannel / 255);
      }

      resolve(alphaMap);
    };
    img.onerror = () => {
      // Fallback to default alpha if image fails to load
      resolve(new Array(logoWidth * logoHeight).fill(0.25));
    };
    img.src = '/doubao_alpha.png';
  });
}

/**
 * Remove Doubao watermark from image
 */
export async function removeDoubaoWatermark(
  image: HTMLImageElement
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const config = detectWatermarkConfig(image.width, image.height);
  const position = calculatePosition(image.width, image.height, config);
  const alphaMap = await loadAlphaMap(config.logoWidth, config.logoHeight);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Build background color map from area above watermark
  const bgColorMap: Map<number, [number, number, number]> = new Map();
  for (let col = 0; col < config.logoWidth; col++) {
    const samples: [number, number, number][] = [];
    for (let sy = Math.max(0, position.y - 60); sy < position.y; sy++) {
      const sx = position.x + col;
      if (sx >= 0 && sx < canvas.width) {
        const idx = (sy * canvas.width + sx) * 4;
        samples.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
      }
    }
    if (samples.length > 0) {
      samples.sort((a, b) => (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]));
      bgColorMap.set(col, samples[Math.floor(samples.length / 2)]);
    }
  }

  // Process watermark region
  for (let row = 0; row < config.logoHeight; row++) {
    for (let col = 0; col < config.logoWidth; col++) {
      const x = position.x + col;
      const y = position.y + row;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const alphaIdx = row * config.logoWidth + col;
      const alpha = alphaMap[alphaIdx];

      if (alpha > 0.15) {
        const bg = bgColorMap.get(col) || [100, 100, 100];
        const noise = Math.floor(Math.random() * 7) - 3;

        const imgIdx = (y * canvas.width + x) * 4;
        pixels[imgIdx] = Math.max(0, Math.min(255, bg[0] + noise));
        pixels[imgIdx + 1] = Math.max(0, Math.min(255, bg[1] + noise));
        pixels[imgIdx + 2] = Math.max(0, Math.min(255, bg[2] + noise));
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
