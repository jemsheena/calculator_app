import { Token } from './tokens';
import { Big } from './big/Big';
import { sin, cos, tan, ln, log10, sqrt, pow } from './functions';
import { AngleMode } from './index';

export function evaluateRPN(rpn: Token[], angleMode: AngleMode): Big {
  const stack: Big[] = [];

  for (const token of rpn) {
    if (token.type === 'num') {
      stack.push(Big.from(token.value));
    } else if (token.type === 'op') {
      if (stack.length < 2) {
        throw new Error('Insufficient operands for operator');
      }
      const b = stack.pop()!;
      const a = stack.pop()!;
      
      let result: Big;
      switch (token.value) {
        case '+':
          result = a.add(b);
          break;
        case '-':
          result = a.sub(b);
          break;
        case '*':
          result = a.mul(b);
          break;
        case '/':
          result = a.div(b);
          break;
        case '%':
          result = a.mod(b);
          break;
        case '^':
          result = pow(a, b);
          break;
        default:
          throw new Error(`Unknown operator: ${token.value}`);
      }
      stack.push(result);
    } else if (token.type === 'func') {
      if (token.value === 'sqrt') {
        if (stack.length < 1) throw new Error('Insufficient operands for sqrt');
        stack.push(sqrt(stack.pop()!));
      } else if (token.value === 'ln') {
        if (stack.length < 1) throw new Error('Insufficient operands for ln');
        stack.push(ln(stack.pop()!));
      } else if (token.value === 'log') {
        if (stack.length < 1) throw new Error('Insufficient operands for log');
        stack.push(log10(stack.pop()!));
      } else if (token.value === 'sin') {
        if (stack.length < 1) throw new Error('Insufficient operands for sin');
        stack.push(sin(stack.pop()!, angleMode));
      } else if (token.value === 'cos') {
        if (stack.length < 1) throw new Error('Insufficient operands for cos');
        stack.push(cos(stack.pop()!, angleMode));
      } else if (token.value === 'tan') {
        if (stack.length < 1) throw new Error('Insufficient operands for tan');
        stack.push(tan(stack.pop()!, angleMode));
      } else if (token.value === 'pow') {
        if (stack.length < 2) throw new Error('Insufficient operands for pow');
        const exp = stack.pop()!;
        const base = stack.pop()!;
        stack.push(pow(base, exp));
      } else {
        throw new Error(`Unknown function: ${token.value}`);
      }
    } else if (token.type === 'unaryMinus') {
      if (stack.length < 1) throw new Error('Insufficient operands for unary minus');
      stack.push(stack.pop()!.neg());
    }
  }

  if (stack.length !== 1) {
    throw new Error('Invalid expression');
  }

  return stack[0]!;
}
