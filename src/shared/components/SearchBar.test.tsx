import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe('SearchBar', () => {
  test('renders SearchBar properly', () => {
    const { container } = render(<SearchBar onQuery={() => { }} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('calls onQuery with right values after 700ms', async () => {
    const onQuery = vi.fn();
    const testInput = 'test';
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: testInput } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith(testInput)
    });
  });

  test('its called only once with the last value', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'foo' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith('foo');
    });
  });

  test('calls onQuery when button is clicked and it has a valid input value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'foo' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith('foo')
  });

  test('has a right value as input placeholder', () => {
    const placeholder = 'Search gif';
    render(<SearchBar onQuery={() => { }} placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });
});
