import React from 'react';

interface ModeToggleProps {
  mode: 'basic' | 'scientific';
  onToggle: () => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="bg-calc-card text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
      aria-label={`Toggle ${mode === 'basic' ? 'scientific' : 'basic'} mode`}
    >
      {mode === 'basic' ? 'Scientific' : 'Basic'}
    </button>
  );
}
