
import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#818cf8' }} />
        <stop offset="100%" style={{ stopColor: '#4f46e5' }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="10" />
    <path
      d="M30 60 Q 50 20 70 60"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M40 70 L 60 70"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);
