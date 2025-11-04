import { useState, useCallback, useEffect } from 'react';
import { evaluateExpression, AngleMode } from '../../../engine';
import { KEYBOARD_MAP } from '../constants/keys';

type CalculatorMode = 'basic' | 'scientific';
type CalculatorState = 'idle' | 'entering' | 'operated' | 'evaluating';

interface CalculatorStateData {
  display: string;
  accumulator: string | null;
  operator: string | null;
  previousOperator: string | null;
  mode: CalculatorMode;
  angleMode: AngleMode;
  memory: number;
  state: CalculatorState;
  history: Array<{ expression: string; result: string }>;
}

const MAX_HISTORY = 50;

export function useCalculator() {
  const [calcState, setCalcState] = useState<CalculatorStateData>({
    display: '0',
    accumulator: null,
    operator: null,
    previousOperator: null,
    mode: 'basic',
    angleMode: 'DEG',
    memory: 0,
    state: 'idle',
    history: [],
  });

  const addToHistory = useCallback((expression: string, result: string) => {
    setCalcState((prev) => ({
      ...prev,
      history: [{ expression, result }, ...prev.history.slice(0, MAX_HISTORY - 1)],
    }));
  }, []);

  const handleDigit = useCallback((digit: string) => {
    setCalcState((prev) => {
      if (prev.state === 'operated' || prev.state === 'evaluating') {
        return {
          ...prev,
          display: digit,
          state: 'entering',
        };
      }
      if (prev.display === '0' || prev.display === 'NaN') {
        return {
          ...prev,
          display: digit,
          state: 'entering',
        };
      }
      return {
        ...prev,
        display: prev.display + digit,
        state: 'entering',
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setCalcState((prev) => {
      if (prev.state === 'operated' || prev.state === 'evaluating') {
        return {
          ...prev,
          display: '0.',
          state: 'entering',
        };
      }
      if (!prev.display.includes('.')) {
        return {
          ...prev,
          display: prev.display + '.',
          state: 'entering',
        };
      }
      return prev;
    });
  }, []);

  const handleOperator = useCallback((op: string) => {
    setCalcState((prev) => {
      if (prev.state === 'entering' && prev.accumulator !== null && prev.operator) {
        // Chain operations: compute previous first
        const expression = `${prev.accumulator} ${prev.operator} ${prev.display}`;
        const result = evaluateExpression(expression, { angleMode: prev.angleMode });
        addToHistory(expression, result);
        return {
          ...prev,
          display: result,
          accumulator: result,
          operator: op,
          state: 'operated',
        };
      }
      if (prev.state === 'entering' || prev.state === 'idle') {
        return {
          ...prev,
          accumulator: prev.display,
          operator: op,
          state: 'operated',
        };
      }
      // Change operator without computing
      return {
        ...prev,
        operator: op,
      };
    });
  }, [addToHistory]);

  const handleEquals = useCallback(() => {
    setCalcState((prev) => {
      // If no operator or accumulator, nothing to calculate
      if (!prev.operator || prev.accumulator === null) {
        return prev;
      }
      
      const expression = `${prev.accumulator} ${prev.operator} ${prev.display}`;
      const result = evaluateExpression(expression, { angleMode: prev.angleMode });
      addToHistory(expression, result);
      
      return {
        ...prev,
        display: result,
        accumulator: null,
        operator: null,
        previousOperator: null,
        state: 'idle',
      };
    });
  }, [addToHistory]);

  const handleClear = useCallback(() => {
    setCalcState((prev) => ({
      ...prev,
      display: '0',
      accumulator: null,
      operator: null,
      previousOperator: null,
      state: 'idle',
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setCalcState((prev) => {
      if (prev.state === 'operated' || prev.state === 'evaluating') {
        return prev;
      }
      if (prev.display.length === 1 || prev.display === 'NaN') {
        return {
          ...prev,
          display: '0',
          state: 'idle',
        };
      }
      return {
        ...prev,
        display: prev.display.slice(0, -1),
        state: 'entering',
      };
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setCalcState((prev) => {
      if (prev.display === '0' || prev.display === 'NaN') {
        return prev;
      }
      const newDisplay = prev.display.startsWith('-')
        ? prev.display.slice(1)
        : '-' + prev.display;
      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const handlePercent = useCallback(() => {
    setCalcState((prev) => {
      const num = parseFloat(prev.display);
      if (isNaN(num)) return prev;
      const percent = (num / 100).toString();
      return {
        ...prev,
        display: percent,
      };
    });
  }, []);

  const handleMemoryClear = useCallback(() => {
    setCalcState((prev) => ({
      ...prev,
      memory: 0,
    }));
  }, []);

  const handleMemoryRecall = useCallback(() => {
    setCalcState((prev) => ({
      ...prev,
      display: prev.memory.toString(),
      state: 'entering',
    }));
  }, []);

  const handleMemoryAdd = useCallback(() => {
    setCalcState((prev) => {
      const num = parseFloat(prev.display);
      if (isNaN(num)) return prev;
      return {
        ...prev,
        memory: prev.memory + num,
      };
    });
  }, []);

  const handleMemorySubtract = useCallback(() => {
    setCalcState((prev) => {
      const num = parseFloat(prev.display);
      if (isNaN(num)) return prev;
      return {
        ...prev,
        memory: prev.memory - num,
      };
    });
  }, []);

  const handleFunction = useCallback((func: string) => {
    setCalcState((prev) => {
      const expression = `${func}(${prev.display})`;
      const result = evaluateExpression(expression, { angleMode: prev.angleMode });
      addToHistory(expression, result);
      return {
        ...prev,
        display: result,
        state: 'idle',
      };
    });
  }, [addToHistory]);

  const handleParenthesis = useCallback((paren: string) => {
    setCalcState((prev) => {
      if (paren === '(') {
        return {
          ...prev,
          display: prev.display === '0' ? '(' : prev.display + '(',
          state: 'entering',
        };
      }
      return prev;
    });
  }, []);

  const handleHistorySelect = useCallback((value: string) => {
    setCalcState((prev) => ({
      ...prev,
      display: value,
      accumulator: null,
      operator: null,
      state: 'idle',
    }));
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      if (key >= '0' && key <= '9') {
        handleDigit(key);
      } else if (key === '.') {
        handleDecimal();
      } else if (['+', '-', '*', '/', '%', '^'].includes(key)) {
        handleOperator(key);
      } else if (key === '=') {
        handleEquals();
      } else if (key === 'C' || key === 'Escape') {
        handleClear();
      } else if (key === '⌫' || key === 'Backspace') {
        handleBackspace();
      } else if (key === '±') {
        handleToggleSign();
      } else if (key === '%') {
        handlePercent();
      } else if (key === 'MC') {
        handleMemoryClear();
      } else if (key === 'MR') {
        handleMemoryRecall();
      } else if (key === 'M+') {
        handleMemoryAdd();
      } else if (key === 'M-') {
        handleMemorySubtract();
      } else if (['sin', 'cos', 'tan', 'ln', 'log', 'sqrt'].includes(key)) {
        handleFunction(key);
      } else if (key === '(' || key === ')') {
        handleParenthesis(key);
      }
    },
    [
      handleDigit,
      handleDecimal,
      handleOperator,
      handleEquals,
      handleClear,
      handleBackspace,
      handleToggleSign,
      handlePercent,
      handleMemoryClear,
      handleMemoryRecall,
      handleMemoryAdd,
      handleMemorySubtract,
      handleFunction,
      handleParenthesis,
    ]
  );

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mappedKey = KEYBOARD_MAP[e.key];
      if (mappedKey) {
        e.preventDefault();
        handleKey(mappedKey);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKey]);

  const toggleMode = useCallback(() => {
    setCalcState((prev) => ({
      ...prev,
      mode: prev.mode === 'basic' ? 'scientific' : 'basic',
    }));
  }, []);

  const toggleAngleMode = useCallback(() => {
    setCalcState((prev) => ({
      ...prev,
      angleMode: prev.angleMode === 'DEG' ? 'RAD' : 'DEG',
    }));
  }, []);

  return {
    display: calcState.display,
    accumulator: calcState.accumulator,
    operator: calcState.operator,
    mode: calcState.mode,
    angleMode: calcState.angleMode,
    memory: calcState.memory,
    history: calcState.history,
    state: calcState.state,
    handleKey,
    handleHistorySelect,
    toggleMode,
    toggleAngleMode,
  };
}
