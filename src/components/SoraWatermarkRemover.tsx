'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function SoraWatermarkRemover() {
  const t = useTranslations('sora');
  const [activeTab, setActiveTab] = useState<'online' | 'desktop'>('desktop');
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('Progress: 0%');
  const [logs, setLogs] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadVideoRef = useRef<HTMLVideoElement>(null);
  const resultVideoRef = useRef<HTMLVideoElement>(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB for online version
  const MAX_DURATION = 10; // 10 seconds

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError(t('errors.fileSize'));
      return;
    }

    const url = URL.createObjectURL(file);
    setUploadedVideo(url);
    setResultVideo(null);
    setError(null);
    setLogs('');
    setProgress(0);
    setProgressText('Progress: 0%');

    // Check video duration
    const video = document.createElement('video');
    video.src = url;
    video.onloadedmetadata = () => {
      if (video.duration > MAX_DURATION + 0.1) {
        setError(t('errors.duration'));
        setUploadedVideo(null);
        URL.revokeObjectURL(url);
      }
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      handleFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClear = () => {
    if (uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo);
    }
    if (resultVideo) {
      URL.revokeObjectURL(resultVideo);
    }
    setUploadedVideo(null);
    setResultVideo(null);
    setError(null);
    setLogs('');
    setProgress(0);
    setProgressText('Progress: 0%');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateProgress = () => {
    let p = 1;
    setProgress(p);
    setProgressText(`Progress: ${p}%`);

    const interval = setInterval(() => {
      p = Math.min(90, p + 2);
      setProgress(p);
      setProgressText(`Progress: ${p}%`);
    }, 860);

    return interval;
  };

  const handleRemoveWatermark = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      setError(t('errors.noFile'));
      return;
    }

    const file = fileInputRef.current.files[0];
    setIsProcessing(true);
    setError(null);
    setLogs('Starting processing...');

    const progressInterval = simulateProgress();

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await fetch('/api/sora/remove', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text.slice(0, 200) || 'Response is not valid JSON');
      }

      if (!response.ok) {
        throw new Error(data?.error || text.slice(0, 200) || 'Request failed');
      }

      const output = data.output;
      let videoUrl = null;
      if (Array.isArray(output)) {
        videoUrl = output[output.length - 1];
      } else if (typeof output === 'string') {
        videoUrl = output;
      } else if (output?.video) {
        videoUrl = output.video;
      }

      if (!videoUrl) {
        throw new Error('No output URL returned');
      }

      setResultVideo(videoUrl);
      if (data.logs) {
        setLogs(data.logs);
      }

      clearInterval(progressInterval);
      setProgress(100);
      setProgressText('Progress: 100%');
    } catch (err: any) {
      clearInterval(progressInterval);
      let errorMsg = err.message || 'Processing failed';

      // Check if it's an insufficient credit error
      if (errorMsg.includes('Insufficient credit') || errorMsg.includes('402')) {
        errorMsg = 'Online version requires API credits. Please use the Desktop Version (recommended) for unlimited free processing!';
      }

      setError(errorMsg);
      setLogs(err.message || String(err));
      setProgress(0);
      setProgressText('Progress: 0%');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!resultVideo) return;

    try {
      const response = await fetch(resultVideo);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sora-cleaned.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (err) {
      console.error(err);
      window.open(resultVideo, '_blank');
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('desktop')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'desktop'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('tabs.desktop')}
        </button>
        <button
          onClick={() => setActiveTab('online')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'online'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {t('tabs.online')}
        </button>
      </div>

      {/* Desktop Version Tab */}
      {activeTab === 'desktop' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('desktop.title')}</h3>
            <p className="text-gray-700 mb-6">{t('desktop.description')}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">{t('desktop.features.title')}</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t('desktop.features.unlimited')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t('desktop.features.faster')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t('desktop.features.free')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t('desktop.features.offline')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t('desktop.features.privacy')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">{t('desktop.requirements.title')}</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>{t('desktop.requirements.cpu')}</li>
                  <li>{t('desktop.requirements.ram')}</li>
                  <li>{t('desktop.requirements.gpu')}</li>
                  <li>{t('desktop.requirements.storage')}</li>
                  <li>{t('desktop.requirements.os')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">{t('desktop.download.title')}</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/sunzhenyu/CleanMark/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  🪟 {t('desktop.download.windows')}
                </a>
                <a
                  href="https://github.com/sunzhenyu/CleanMark/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-semibold"
                >
                  🍎 {t('desktop.download.mac')}
                </a>
                <a
                  href="https://github.com/sunzhenyu/CleanMark/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                >
                  🐧 {t('desktop.download.linux')}
                </a>
                <a
                  href="https://github.com/sunzhenyu/CleanMark/tree/main/website/sora2_watermark_remover_web_gui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  📦 {t('desktop.download.github')}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">{t('desktop.instructions.title')}</h4>
              <ol className="space-y-2 text-gray-700">
                <li>{t('desktop.instructions.step1')}</li>
                <li>{t('desktop.instructions.step2')}</li>
                <li>{t('desktop.instructions.step3')}</li>
                <li>{t('desktop.instructions.step4')}</li>
                <li>{t('desktop.instructions.step5')}</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Online Version Tab */}
      {activeTab === 'online' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">{t('online.note')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">{t('upload.title')}</h3>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer h-72 overflow-hidden hover:border-gray-400 transition"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {!uploadedVideo ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-2xl text-gray-600">+</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{t('upload.clickOrDrop')}</p>
                    <p className="text-xs text-gray-500">{t('upload.limits')}</p>
                  </div>
                ) : (
                  <video
                    ref={uploadVideoRef}
                    src={uploadedVideo}
                    controls
                    muted
                    playsInline
                    className="w-full h-full object-contain bg-black rounded-xl"
                  />
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleRemoveWatermark}
                  disabled={!uploadedVideo || isProcessing}
                  className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isProcessing ? t('upload.processing') : t('upload.remove')}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
                >
                  {t('upload.clear')}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-black rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-600">{progressText}</p>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                  {error.includes('Desktop Version') && (
                    <button
                      onClick={() => setActiveTab('desktop')}
                      className="mt-2 block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Switch to Desktop Version
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">{t('result.title')}</h3>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center h-72 overflow-hidden">
                {!resultVideo ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-2xl">📺</span>
                    </div>
                    <p className="text-sm text-gray-700">{t('result.empty')}</p>
                  </div>
                ) : (
                  <video
                    ref={resultVideoRef}
                    src={resultVideo}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black rounded-xl"
                  />
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={handleDownload}
                  disabled={!resultVideo}
                  className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {t('result.download')}
                </button>
                <button
                  onClick={() => setShowLogs(!showLogs)}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition"
                >
                  {showLogs ? t('result.hideLogs') : t('result.showLogs')}
                </button>
              </div>

              {showLogs && logs && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {logs}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
