import * as esbuild from 'esbuild';

// 打包 content script
await esbuild.build({
  entryPoints: ['content.js'],
  bundle: true,
  outfile: 'dist/content.js',
  format: 'iife',
  platform: 'browser',
  target: 'chrome100',
  minify: false, // 不压缩，便于调试
  sourcemap: false,
  loader: {
    '.js': 'js'
  }
});

console.log('Build complete!');
