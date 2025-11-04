export type Operator = '+' | '-' | '*' | '/' | '%' | '^';
export type FunctionName = 'sin' | 'cos' | 'tan' | 'ln' | 'log' | 'sqrt' | 'pow';
export type Paren = '(' | ')';

export type Token =
  | { type: 'num'; value: string }
  | { type: 'op'; value: Operator }
  | { type: 'func'; value: FunctionName }
  | { type: 'paren'; value: Paren }
  | { type: 'unaryMinus' }; 