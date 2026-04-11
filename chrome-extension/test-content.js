// 测试脚本 - 不使用 ES 模块
console.log('[CleanMark Test] Script loaded successfully!');

// 测试基本功能
document.addEventListener('DOMContentLoaded', () => {
  console.log('[CleanMark Test] DOM loaded');
});

console.log('[CleanMark Test] Current URL:', window.location.href);
console.log('[CleanMark Test] Is Gemini?', window.location.href.includes('gemini.google.com'));
