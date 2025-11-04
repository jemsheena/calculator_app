import React from 'react';
import { Key } from './Key';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  mode: 'basic' | 'scientific';
  selectedOperator?: string | null;
}

const BASIC_KEYS = [
  [{ label: 'C', key: 'C', variant: 'clear' as const }],
  [
    { label: '⌫', key: '⌫', variant: 'default' as const },
    { label: '%', key: '%', variant: 'operator' as const },
    { label: '÷', key: '/', variant: 'operator' as const },
  ],
  [
    { label: '7', key: '7' },
    { label: '8', key: '8' },
    { label: '9', key: '9' },
    { label: '×', key: '*', variant: 'operator' as const },
  ],
  [
    { label: '4', key: '4' },
    { label: '5', key: '5' },
    { label: '6', key: '6' },
    { label: '−', key: '-', variant: 'operator' as const },
  ],
  [
    { label: '1', key: '1' },
    { label: '2', key: '2' },
    { label: '3', key: '3' },
    { label: '+', key: '+', variant: 'operator' as const },
  ],
  [
    { label: '±', key: '±' },
    { label: '0', key: '0' },
    { label: '.', key: '.' },
    { label: '=', key: '=', variant: 'equals' as const, span: true },
  ],
];

// Scientific mode: 7 columns layout matching Google calculator
const SCIENTIFIC_KEYS = [
  // Row 1: (, ), %, C, ⌫, ±, ^ (7 buttons spread across - top control row)
  [
    { label: '(', key: '(', variant: 'function' as const },
    { label: ')', key: ')', variant: 'function' as const },
    { label: '%', key: '%', variant: 'operator' as const },
    { label: 'C', key: 'C', variant: 'clear' as const },
    { label: '⌫', key: '⌫', variant: 'default' as const },
    { label: '±', key: '±' },
    { label: '^', key: '^', variant: 'operator' as const },
  ],
  // Row 2: sin, ln, √ + 7, 8, 9, ÷
  // Pattern: 3 scientific functions (left) + 4 numeric keypad (right)
  [
    { label: 'sin', key: 'sin', variant: 'function' as const },
    { label: 'ln', key: 'ln', variant: 'function' as const },
    { label: '√', key: 'sqrt', variant: 'function' as const },
    { label: '7', key: '7' },
    { label: '8', key: '8' },
    { label: '9', key: '9' },
    { label: '÷', key: '/', variant: 'operator' as const },
  ],
  // Row 3: cos, log, M- + 4, 5, 6, ×
  [
    { label: 'cos', key: 'cos', variant: 'function' as const },
    { label: 'log', key: 'log', variant: 'function' as const },
    { label: 'M-', key: 'M-', variant: 'function' as const },
    { label: '4', key: '4' },
    { label: '5', key: '5' },
    { label: '6', key: '6' },
    { label: '×', key: '*', variant: 'operator' as const },
  ],
  // Row 4: tan, MC, MR + 1, 2, 3, −
  [
    { label: 'tan', key: 'tan', variant: 'function' as const },
    { label: 'MC', key: 'MC', variant: 'function' as const },
    { label: 'MR', key: 'MR', variant: 'function' as const },
    { label: '1', key: '1' },
    { label: '2', key: '2' },
    { label: '3', key: '3' },
    { label: '−', key: '-', variant: 'operator' as const },
  ],
  // Row 5: M+, (empty), (empty) + 0, ., =, +
  [
    { label: 'M+', key: 'M+', variant: 'function' as const },
    { label: '', key: '', variant: 'default' as const },
    { label: '', key: '', variant: 'default' as const },
    { label: '0', key: '0' },
    { label: '.', key: '.' },
    { label: '=', key: '=', variant: 'equals' as const },
    { label: '+', key: '+', variant: 'operator' as const },
  ],
];

export function Keypad({ onKeyPress, mode, selectedOperator }: KeypadProps) {
  const keys = mode === 'scientific' ? SCIENTIFIC_KEYS : BASIC_KEYS;
  const cols = mode === 'scientific' ? 'grid-cols-7' : 'grid-cols-4';

  return (
    <div className={`grid ${cols} gap-3`}>
      {keys.flat().map((keyConfig, index) => {
        // Skip empty keys
        if (!keyConfig.key || keyConfig.key === '') {
          return <div key={`empty-${index}`} />;
        }

        const isSelected = selectedOperator && 
          ((selectedOperator === '*' && keyConfig.key === '*') ||
           (selectedOperator === '/' && keyConfig.key === '/') ||
           (selectedOperator === '+' && keyConfig.key === '+') ||
           (selectedOperator === '-' && keyConfig.key === '-') ||
           (selectedOperator === '%' && keyConfig.key === '%') ||
           (selectedOperator === '^' && keyConfig.key === '^'));
        
        // For equals button in basic mode, span 2 columns
        const shouldSpan = mode === 'basic' && keyConfig.key === '=' && (keyConfig as any).span;
        
        return (
          <Key
            key={`${keyConfig.key}-${index}`}
            label={keyConfig.label}
            onClick={() => onKeyPress(keyConfig.key)}
            variant={keyConfig.variant}
            className={`${shouldSpan ? 'col-span-2' : ''} ${isSelected ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-calc-bg' : ''}`}
          />
        );
      })}
    </div>
  );
}
