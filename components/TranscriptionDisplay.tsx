
import React, { useState } from 'react';
import { CopyIcon, CheckIcon, DownloadIcon } from './Icons';

interface TranscriptionDisplayProps {
  text: string;
}

const useCopyToClipboard = (): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return [isCopied, copy];
};

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Transcription Result</h2>
            <div className="flex space-x-2">
                 <button
                    onClick={() => copyToClipboard(text)}
                    className="flex items-center p-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                    title={isCopied ? "Copied!" : "Copy to clipboard"}
                >
                    {isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                 </button>
                 <button
                    onClick={handleDownload}
                    className="flex items-center p-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                    title="Download as .txt"
                >
                    <DownloadIcon className="w-5 h-5" />
                 </button>
            </div>
        </div>
      
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[150px] max-h-[300px] overflow-y-auto">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};
