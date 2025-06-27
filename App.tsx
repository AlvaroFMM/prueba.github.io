
import React, { useState, useCallback } from 'react';
import { transcribeAudio } from './services/geminiService';
import { FileUpload } from './components/FileUpload';
import { TranscriptionDisplay } from './components/TranscriptionDisplay';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    setTranscription('');
    setError(null);
  };

  const handleTranscribe = useCallback(async () => {
    if (!file) {
      setError('Please select an audio file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranscription('');

    try {
      const result = await transcribeAudio(file);
      setTranscription(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Transcription failed: ${err.message}`);
      } else {
        setError('An unknown error occurred during transcription.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Logo className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">AI Audio Transcriber</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Upload your audio file and get a text transcription in seconds.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-700">
          <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />

          <button
            onClick={handleTranscribe}
            disabled={!file || isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-primary-600 rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Spinner />
                Transcribing...
              </>
            ) : (
              'Transcribe Audio'
            )}
          </button>

          {error && <ErrorMessage message={error} />}

          {transcription && !isLoading && <TranscriptionDisplay text={transcription} />}
        </div>
        
        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>Powered by Google Gemini. App designed by a World-Class React Engineer.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
