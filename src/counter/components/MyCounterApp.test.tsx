import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe('MyCounterApp', () => {
  test('renders the component', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      `Counter: 10`
    );

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('increments the counter', () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '+1' });

    fireEvent.click(button);

    expect(labelH1.innerHTML).toContain('Counter: 11');
  });

  test('decrements the counter', () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });

    fireEvent.click(button);

    expect(labelH1.innerHTML).toContain('Counter: 9');
  });
});
