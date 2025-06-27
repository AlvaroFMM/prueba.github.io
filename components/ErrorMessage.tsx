
import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <AlertTriangleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
    <span className="font-medium">{message}</span>
  </div>
);
