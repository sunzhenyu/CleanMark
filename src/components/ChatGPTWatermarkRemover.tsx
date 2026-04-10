'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

function cleanText(text: string): string {
  if (!text) return '';
  const invisibleCharsRegex =
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u0080-\u009F\u00AD\u034F\u061C\u115F\u1160\u180E\u200B-\u200F\u202A-\u202E\u202F\u205F\u2060-\u2064\uFEFF]/g;
  let cleaned = text.replace(invisibleCharsRegex, '');
  cleaned = cleaned.replace(/[\u2014\u2013]/g, '-');
  return cleaned.trim();
}

function countHiddenChars(text: string): number {
  const invisibleCharsRegex =
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u0080-\u009F\u00AD\u034F\u061C\u115F\u1160\u180E\u200B-\u200F\u202A-\u202E\u202F\u205F\u2060-\u2064\uFEFF\u2014\u2013]/g;
  return (text.match(invisibleCharsRegex) || []).length;
}

export default function ChatGPTWatermarkRemover() {
  const t = useTranslations('chatgpt');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removedCount, setRemovedCount] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClean = useCallback(() => {
    if (!input.trim()) return;
    const count = countHiddenChars(input);
    const cleaned = cleanText(input);
    setOutput(cleaned);
    setRemovedCount(count);
    setCopied(false);
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setOutput('');
      setRemovedCount(null);
    } catch {
      // clipboard read denied — user can paste manually
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setRemovedCount(null);
    setCopied(false);
  }, []);

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">{t('inputLabel')}</label>
          <div className="flex gap-2">
            <button
              onClick={handlePasteFromClipboard}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition"
            >
              📋 {t('pasteBtn')}
            </button>
            {(input || output) && (
              <button
                onClick={handleClear}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-md transition"
              >
                {t('clearBtn')}
              </button>
            )}
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput('');
            setRemovedCount(null);
          }}
          placeholder={t('inputPlaceholder')}
          className="w-full h-48 p-3 border border-gray-300 rounded-lg text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Clean button */}
      <button
        onClick={handleClean}
        disabled={!input.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
      >
        ✨ {t('cleanBtn')}
      </button>

      {/* Result */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">{t('outputLabel')}</label>
              {removedCount !== null && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    removedCount > 0
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {removedCount > 0
                    ? t('removedCount', { count: removedCount })
                    : t('noHiddenChars')}
                </span>
              )}
            </div>
            <button
              onClick={handleCopy}
              className={`text-xs px-3 py-1 rounded-md transition font-medium ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              }`}
            >
              {copied ? `✅ ${t('copiedBtn')}` : `📋 ${t('copyBtn')}`}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-48 p-3 border border-gray-200 rounded-lg text-sm font-mono resize-y bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
