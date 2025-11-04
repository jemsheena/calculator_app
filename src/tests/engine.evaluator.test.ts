import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../engine';

describe('Engine Evaluator', () => {
  describe('Basic Operations', () => {
    it('should add two numbers', () => {
      expect(evaluateExpression('2 + 3')).toBe('5');
    });

    it('should subtract two numbers', () => {
      expect(evaluateExpression('10 - 4')).toBe('6');
    });

    it('should multiply two numbers', () => {
      expect(evaluateExpression('4 * 5')).toBe('20');
    });

    it('should divide two numbers', () => {
      expect(evaluateExpression('15 / 3')).toBe('5');
    });

    it('should handle division by zero', () => {
      expect(evaluateExpression('10 / 0')).toBe('NaN');
    });

    it('should handle modulo operation', () => {
      expect(evaluateExpression('10 % 3')).toBe('1');
    });
  });

  describe('Order of Operations', () => {
    it('should respect multiplication precedence', () => {
      expect(evaluateExpression('2 + 3 * 4')).toBe('14');
    });

    it('should handle parentheses', () => {
      expect(evaluateExpression('(2 + 3) * 4')).toBe('20');
    });

    it('should handle nested parentheses', () => {
      expect(evaluateExpression('(2 + (3 * 2)) * 4')).toBe('32');
    });

    it('should handle exponentiation (right-associative)', () => {
      expect(evaluateExpression('2 ^ 3 ^ 2')).toBe('512'); // 2^(3^2) = 2^9 = 512
    });
  });

  describe('Trigonometric Functions', () => {
    it('should calculate sin(30) in degrees', () => {
      const result = evaluateExpression('sin(30)', { angleMode: 'DEG' });
      expect(parseFloat(result)).toBeCloseTo(0.5, 5);
    });

    it('should calculate cos(60) in degrees', () => {
      const result = evaluateExpression('cos(60)', { angleMode: 'DEG' });
      expect(parseFloat(result)).toBeCloseTo(0.5, 5);
    });

    it('should calculate sin in radians', () => {
      const result = evaluateExpression('sin(1.5708)', { angleMode: 'RAD' });
      expect(parseFloat(result)).toBeCloseTo(1, 3);
    });
  });

  describe('Logarithmic Functions', () => {
    it('should calculate natural logarithm', () => {
      const result = evaluateExpression('ln(2.71828)');
      expect(parseFloat(result)).toBeCloseTo(1, 3);
    });

    it('should calculate log10', () => {
      expect(evaluateExpression('log(100)')).toBe('2');
    });

    it('should handle invalid log input', () => {
      expect(evaluateExpression('ln(-1)')).toBe('NaN');
    });
  });

  describe('Other Functions', () => {
    it('should calculate square root', () => {
      expect(evaluateExpression('sqrt(16)')).toBe('4');
    });

    it('should handle negative square root', () => {
      expect(evaluateExpression('sqrt(-1)')).toBe('NaN');
    });
  });

  describe('Precision and Formatting', () => {
    it('should handle decimal results', () => {
      expect(evaluateExpression('1 / 3')).toMatch(/^0\.333333/);
    });

    it('should trim trailing zeros', () => {
      const result = evaluateExpression('2.0 + 3.0');
      expect(result).toBe('5');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      expect(evaluateExpression('')).toBe('0');
    });

    it('should handle unary minus', () => {
      expect(evaluateExpression('-5')).toBe('-5');
    });

    it('should handle negative numbers in expressions', () => {
      expect(evaluateExpression('-5 + 3')).toBe('-2');
    });
  });
});
