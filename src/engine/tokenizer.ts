import { Token, FunctionName } from './tokens';

const FUNCTIONS: FunctionName[] = ['sin', 'cos', 'tan', 'ln', 'log', 'sqrt', 'pow'];
const OPERATORS = ['+', '-', '*', '/', '%', '^'];

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = input.length;

  while (i < len) {
    const char = input[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Numbers (including decimals and scientific notation)
    if (/\d/.test(char) || char === '.') {
      let num = '';
      while (i < len && (/\d/.test(input[i]) || input[i] === '.' || /[eE]/.test(input[i]) || /[+-]/.test(input[i]) && (input[i - 1] === 'e' || input[i - 1] === 'E'))) {
        num += input[i];
        i++;
      }
      tokens.push({ type: 'num', value: num });
      continue;
    }

    // Functions
    if (/[a-z]/.test(char)) {
      let func = '';
      while (i < len && /[a-z]/.test(input[i])) {
        func += input[i];
        i++;
      }
      if (FUNCTIONS.includes(func as FunctionName)) {
        tokens.push({ type: 'func', value: func as FunctionName });
        continue;
      }
      throw new Error(`Unknown function: ${func}`);
    }

    // Parentheses
    if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char });
      i++;
      continue;
    }

    // Operators
    if (OPERATORS.includes(char)) {
      // Handle unary minus
      if (char === '-') {
        const prevToken = tokens[tokens.length - 1];
        if (!prevToken || prevToken.type === 'op' || (prevToken.type === 'paren' && prevToken.value === '(')) {
          tokens.push({ type: 'unaryMinus' });
          i++;
          continue;
        }
      }
      tokens.push({ type: 'op', value: char as Token['value'] });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}
