import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculatorPage } from '../pages/CalculatorPage';

describe('Calculator UI', () => {
  it('should display initial value', () => {
    render(<CalculatorPage />);
    expect(screen.getByRole('status')).toHaveTextContent('0');
  });

  it('should handle digit input', async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);
    
    const sevenKey = screen.getByRole('button', { name: '7' });
    await user.click(sevenKey);
    
    expect(screen.getByRole('status')).toHaveTextContent('7');
  });

  it('should perform addition', async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);
    
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '=' }));
    
    expect(screen.getByRole('status')).toHaveTextContent('10');
  });

  it('should handle clear button', async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);
    
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'C' }));
    
    expect(screen.getByRole('status')).toHaveTextContent('0');
  });

  it('should handle division by zero', async () => {
    const user = userEvent.setup();
    render(<CalculatorPage />);
    
    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: '÷' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: '=' }));
    
    expect(screen.getByRole('status')).toHaveTextContent('NaN');
  });
});
