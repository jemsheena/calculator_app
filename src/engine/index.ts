import { tokenize } from './tokenizer';
import { shuntingYard } from './shuntingYard';
import { evaluateRPN } from './evaluator';

export type AngleMode = 'DEG' | 'RAD';

export interface EvalOptions {
  angleMode?: AngleMode;
  precision?: number;
  locale?: string;
}

function formatResult(result: string, precision: number = 12): string {
  // Handle NaN, Infinity
  if (result === 'NaN' || result === 'Infinity' || result === '-Infinity') {
    return 'NaN';
  }

  // Convert to number for formatting, then back to string to handle scientific notation
  const num = parseFloat(result);
  
  if (isNaN(num)) {
    return 'NaN';
  }

  if (!isFinite(num)) {
    return 'NaN';
  }

  // Handle very large or very small numbers with scientific notation
  const absNum = Math.abs(num);
  if ((absNum > 0 && absNum < 1e-10) || absNum >= 1e12) {
    return num.toExponential(precision - 1);
  }

  // Format with fixed precision, then trim trailing zeros
  const formatted = num.toFixed(precision);
  
  // Remove trailing zeros and decimal point if not needed
  return formatted.replace(/\.?0+$/, '');
}

export function evaluateExpression(input: string, opts: EvalOptions = {}): string {
  const { angleMode = 'DEG', precision = 12 } = opts;

  try {
    // Normalize input: handle percentage as division by 100
    let normalizedInput = input.trim();
    if (!normalizedInput) {
      return '0';
    }

    // Tokenize, parse, and evaluate
    const tokens = tokenize(normalizedInput);
    const rpn = shuntingYard(tokens);
    const result = evaluateRPN(rpn, angleMode);

    if (result.isNaN()) {
      return 'NaN';
    }

    const resultStr = result.toString();
    return formatResult(resultStr, precision);
  } catch (error) {
    return 'NaN';
  }
}
