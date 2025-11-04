import React from 'react';

interface AngleToggleProps {
  angleMode: 'DEG' | 'RAD';
  onToggle: () => void;
}

export function AngleToggle({ angleMode, onToggle }: AngleToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="bg-calc-card text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
      aria-label={`Toggle angle mode: ${angleMode}`}
    >
      {angleMode}
    </button>
  );
}
