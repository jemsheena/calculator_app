import React from 'react';
import { useCalculator } from '../features/calculator/hooks/useCalculator';
import { Display } from '../components/Display';
import { Keypad } from '../components/Keypad';
import { ModeToggle } from '../components/ModeToggle';
import { AngleToggle } from '../components/AngleToggle';
import { MemoryBar } from '../components/MemoryBar';
import { HistoryPanel } from '../components/HistoryPanel';

export function CalculatorPage() {
  const {
    display,
    accumulator,
    operator,
    mode,
    angleMode,
    memory,
    history,
    state,
    handleKey,
    handleHistorySelect,
    toggleMode,
    toggleAngleMode,
  } = useCalculator();

  // Build expression for display
  const expression = accumulator && operator 
    ? `${accumulator} ${operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : operator}` 
    : undefined;

  return (
    <div className="min-h-screen bg-calc-bg text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex gap-4 items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Calculator</h1>
          <div className="flex gap-2">
            <ModeToggle mode={mode} onToggle={toggleMode} />
            {mode === 'scientific' && (
              <AngleToggle angleMode={angleMode} onToggle={toggleAngleMode} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Display value={display} expression={expression} showCursor={state === 'entering'} />
            <MemoryBar
              memory={memory}
              onMemoryClear={() => handleKey('MC')}
              onMemoryRecall={() => handleKey('MR')}
              onMemoryAdd={() => handleKey('M+')}
              onMemorySubtract={() => handleKey('M-')}
            />
            <Keypad onKeyPress={handleKey} mode={mode} selectedOperator={operator} />
          </div>

          <div className="md:col-span-1">
            <HistoryPanel
              history={history}
              onSelect={(result) => handleHistorySelect(result)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
