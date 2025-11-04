import React from 'react';

interface HistoryItem {
  expression: string;
  result: string;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect?: (result: string) => void;
}

export function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="bg-calc-card rounded-lg p-6 border border-gray-800">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="text-gray-500 text-4xl mb-3">📊</div>
          <h3 className="text-white font-semibold mb-2 text-base">History</h3>
          <p className="text-gray-400 text-sm">No calculations yet</p>
          <p className="text-gray-500 text-xs mt-1">Your calculation history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-calc-card rounded-lg border border-gray-800 overflow-hidden flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-base flex items-center gap-2">
            <span className="text-emerald-400">📜</span>
            History
          </h3>
          <span className="text-gray-500 text-xs font-mono tabular-nums">
            {history.length}
          </span>
        </div>
      </div>

      {/* History Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-800/50">
          {history.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelect?.(item.result)}
              className="w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-all duration-150 focus:outline-none focus:bg-gray-800/50 focus:ring-1 focus:ring-emerald-400/50 group"
              aria-label={`Select result: ${item.result} from expression ${item.expression}`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Expression */}
                <div className="flex-1 min-w-0">
                  <div className="text-gray-400 text-xs font-mono mb-1.5 truncate group-hover:text-gray-300 transition-colors">
                    {item.expression}
                  </div>
                  {/* Result */}
                  <div className="text-white text-base font-mono tabular-nums font-semibold group-hover:text-emerald-400 transition-colors break-all">
                    = {item.result}
                  </div>
                </div>
                {/* Index indicator */}
                <div className="flex-shrink-0 text-gray-600 text-xs font-mono tabular-nums pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  #{history.length - index}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      {history.length > 5 && (
        <div className="px-4 py-2 border-t border-gray-800 bg-gray-900/30">
          <p className="text-gray-500 text-xs text-center">
            Click any result to use it
          </p>
        </div>
      )}
    </div>
  );
}
