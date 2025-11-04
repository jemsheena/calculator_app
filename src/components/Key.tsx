import React from 'react';

interface KeyProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'operator' | 'function' | 'equals' | 'clear';
  ariaLabel?: string;
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-700 hover:bg-gray-600 text-white',
  operator: 'bg-calc-accent hover:bg-emerald-600 text-white',
  function: 'bg-gray-600 hover:bg-gray-500 text-white text-sm',
  equals: 'bg-calc-accent hover:bg-emerald-600 text-white',
  clear: 'bg-red-600 hover:bg-red-700 text-white',
};

export function Key({
  label,
  onClick,
  variant = 'default',
  ariaLabel,
  className = '',
}: KeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        h-14 md:h-16 rounded-lg
        font-medium text-xl
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-calc-bg
        active:scale-95
        ${className}
      `}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}
