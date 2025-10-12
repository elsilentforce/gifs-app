import { describe, test, expect } from "vitest";
import { useCounter } from "./useCounter";
import { renderHook, act } from "@testing-library/react";

describe('useCounter', () => {
  describe('with default initial value', () => {
    test('initializes with default value of 10', () => {
      const { result } = renderHook(() => useCounter());
      expect(result.current.counter).toBe(10);
    });

    test('increment counter when handleAdd is called', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.handleAdd();
      });

      expect(result.current.counter).toBe(11)
    });

    test('increment counter when handleSubstract is called', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.handleSubstract();
      });

      expect(result.current.counter).toBe(9)
    });

    test('set counter to 10 when handleReset is called', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.handleReset();
      });

      expect(result.current.counter).toBe(10);
    });

  });

  describe('when initial value is 20', () => {
    const initialValue = 20;

    test('initializes with default value of 20', () => {
      const { result } = renderHook(() => useCounter(initialValue));
      expect(result.current.counter).toBe(initialValue);
    });


    test('set counter to 20 when handleReset is called', () => {
      const { result } = renderHook(() => useCounter(initialValue));

      act(() => {
        result.current.handleReset();
      });

      expect(result.current.counter).toBe(initialValue);
    });
  });
});
