export const KEYBOARD_MAP: Record<string, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '.': '.',
  '+': '+',
  '-': '-',
  '*': '*',
  '/': '/',
  '%': '%',
  '^': '^',
  'Enter': '=',
  '=': '=',
  'Backspace': '⌫',
  'Escape': 'C',
  'p': '%',
  'm': 'MR',
  's': 'sci',
};

export type KeyAction =
  | 'digit'
  | 'operator'
  | 'equals'
  | 'clear'
  | 'backspace'
  | 'decimal'
  | 'toggleSign'
  | 'percent'
  | 'memoryClear'
  | 'memoryRecall'
  | 'memoryAdd'
  | 'memorySubtract'
  | 'toggleScientific'
  | 'function';
