'use client';

import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (preRef.current) {
      const code = preRef.current.textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
      });
    }
  };

  return (
    <div className="relative">
      <pre {...props} ref={preRef}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded transition-opacity hover:opacity-70"
        style={{
          color: 'var(--color-text-primary)',
          opacity: 0.5,
        }}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
