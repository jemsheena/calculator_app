import React from 'react';

interface DisplayProps {
  value: string;
  expression?: string;
  showCursor?: boolean;
}

export function Display({ value, expression, showCursor = false }: DisplayProps) {
  return (
    <div className="bg-calc-card rounded-lg p-4 mb-4">
      {expression && (
        <div className="text-gray-400 text-sm mb-2 text-right font-mono tabular-nums">
          {expression}
        </div>
      )}
      <div
        className="text-white text-4xl md:text-5xl font-mono tabular-nums text-right break-all overflow-x-auto relative outline-none border-none"
        role="status"
        aria-live="polite"
        aria-label={`Display: ${value}`}
        style={{ caretColor: 'transparent' }}
      >
        {value}
        {showCursor && (
          <span className="inline-block w-0.5 h-8 md:h-10 bg-white ml-1 align-middle animate-blink cursor-caret" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
