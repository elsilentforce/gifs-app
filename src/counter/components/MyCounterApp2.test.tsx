import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MyCounterApp } from "./MyCounterApp";

const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock('../hooks/useCounter', () => ({
  useCounter: () => ({
    counter: 20,
    handleAdd: handleAddMock,
    handleReset: handleResetMock,
    handleSubstract: handleSubstractMock
  }),
}));

describe('MyCounterApp', () => {
  test('renders the component', () => {
    render(<MyCounterApp />);
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      `Counter: 20`
    );

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('calls handleAdd if button is clicked', () => {
    render(<MyCounterApp />);

    const button = screen.getByRole('button', { name: '+1' });

    fireEvent.click(button);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubstractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });
});
