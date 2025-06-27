
import React, { useState, useCallback } from 'react';
import { FileIcon, UploadIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setFileName(file.name);
        onFileSelect(file);
      } else {
        alert('Please select a valid audio file (e.g., MP3, WAV, M4A).');
        setFileName(null);
        onFileSelect(null);
      }
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled) {
      handleFileChange(e.dataTransfer.files);
    }
  }, [disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };
  
  const baseClasses = "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300";
  const idleClasses = "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600";
  const draggingClasses = "border-primary-500 bg-primary-50 dark:bg-primary-900/50";
  const disabledClasses = "cursor-not-allowed bg-gray-200 dark:bg-gray-800 opacity-50";

  const getLabelClass = () => {
    if (disabled) return `${baseClasses} ${disabledClasses}`;
    if (isDragging) return `${baseClasses} ${draggingClasses}`;
    return `${baseClasses} ${idleClasses}`;
  };

  return (
    <div>
      <label
        htmlFor="dropzone-file"
        className={getLabelClass()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">MP3, WAV, M4A, etc. (Max 50MB)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="audio/*" onChange={handleInputChange} disabled={disabled} />
      </label>
      {fileName && (
        <div className="mt-4 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <FileIcon className="w-5 h-5 mr-2 text-primary-500" />
          <span>{fileName}</span>
        </div>
      )}
    </div>
  );
};
