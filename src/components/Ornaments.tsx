/** Hand-drawn pieces lifted from the logo: its swash and its waves. */

export function WaveSwash({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 44"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M0 40C78 8 170 2 262 18c70 12 134 22 204 8 76-15 150-24 254-22-96 4-172 14-246 30-74 15-142 8-212-4C176 16 86 16 0 40Z" />
    </svg>
  );
}

export function WaveEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden
      className={`block w-full ${className}`}
      fill="currentColor"
    >
      <path d="M0 42c180-44 330-44 520-14s330 42 500 12 290-40 420-12v42H0Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24s8.24 3.7 8.24 8.24-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06a6.77 6.77 0 0 1-1.99-1.23 7.46 7.46 0 0 1-1.38-1.72c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.24-.86.84-.86 2.06 0 1.21.88 2.38 1.01 2.55.12.16 1.74 2.65 4.21 3.72.59.25 1.05.41 1.4.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}
