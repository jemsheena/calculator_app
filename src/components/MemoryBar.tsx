import React from 'react';
import { Key } from './Key';

interface MemoryBarProps {
  memory: number;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
}

export function MemoryBar({
  memory,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
}: MemoryBarProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex-1 bg-calc-card rounded-lg px-4 py-2 text-gray-400 text-sm">
        M: {memory === 0 ? '0' : memory.toString()}
      </div>
      <Key
        label="MC"
        onClick={onMemoryClear}
        variant="function"
        ariaLabel="Memory Clear"
        className="h-10 text-sm"
      />
      <Key
        label="MR"
        onClick={onMemoryRecall}
        variant="function"
        ariaLabel="Memory Recall"
        className="h-10 text-sm"
      />
      <Key
        label="M+"
        onClick={onMemoryAdd}
        variant="function"
        ariaLabel="Memory Add"
        className="h-10 text-sm"
      />
      <Key
        label="M-"
        onClick={onMemorySubtract}
        variant="function"
        ariaLabel="Memory Subtract"
        className="h-10 text-sm"
      />
    </div>
  );
}
