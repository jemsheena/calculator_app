import { Token } from './tokens';

// Operator precedence (higher = more precedence)
const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
};

// Right-associative operators
const RIGHT_ASSOC = new Set(['^']);

export function shuntingYard(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const operators: Token[] = [];

  for (const token of tokens) {
    if (token.type === 'num') {
      output.push(token);
    } else if (token.type === 'func') {
      operators.push(token);
    } else if (token.type === 'op') {
      while (
        operators.length > 0 &&
        operators[operators.length - 1].type !== 'paren' &&
        (PRECEDENCE[(operators[operators.length - 1] as { value: string }).value] > PRECEDENCE[token.value] ||
          (PRECEDENCE[(operators[operators.length - 1] as { value: string }).value] === PRECEDENCE[token.value] &&
            !RIGHT_ASSOC.has(token.value)))
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (token.type === 'paren' && token.value === '(') {
      operators.push(token);
    } else if (token.type === 'paren' && token.value === ')') {
      while (operators.length > 0 && operators[operators.length - 1].type !== 'paren') {
        output.push(operators.pop()!);
      }
      if (operators.length === 0) {
        throw new Error('Mismatched parentheses');
      }
      operators.pop(); // Remove '('
      if (operators.length > 0 && operators[operators.length - 1].type === 'func') {
        output.push(operators.pop()!);
      }
    } else if (token.type === 'unaryMinus') {
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    const op = operators.pop()!;
    if (op.type === 'paren') {
      throw new Error('Mismatched parentheses');
    }
    output.push(op);
  }

  return output;
}
