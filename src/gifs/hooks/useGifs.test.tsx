import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as actions from '../actions/get-gifs-by-query.actions';
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';
import { giphySearchResponseMock } from './../../../tests/mocks/giphy.response.data';


describe('useGifs', () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });

  test('return default values and methods', () => {
    const { result } = renderHook(() => useGifs());
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test('returns a list of gifs', async () => {
    // handleSearch
    const { result } = renderHook(() => useGifs());
    mock.onGet('/search').reply(200, giphySearchResponseMock);

    await act(async () => {
      await result.current.handleSearch('foo');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('returns a list of gifs when handleTermClicked is called', async () => {
    // handleTermClicked
    const { result } = renderHook(() => useGifs());
    mock.onGet('/search').reply(200, giphySearchResponseMock);

    await act(async () => {
      await result.current.handleTermClicked('foo');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('returns a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());
    mock.onGet('/search').reply(200, giphySearchResponseMock);

    await act(async () => {
      await result.current.handleTermClicked('foo')
    });

    // Raises an error if 'getGifsByQuery' is called instead using cached values
    vi.spyOn(actions, 'getGifsByQuery')
      .mockRejectedValue(new Error('This is my custom error'));

    await act(async () => {
      await result.current.handleTermClicked('foo')
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('returns no more than 8 previous terms', async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(actions, 'getGifsByQuery').mockResolvedValue([]);

    for (let i = 1; i < 10; i++) {
      await act(async () => {
        await result.current.handleSearch(`foo${i}`)
      });
    };

    expect(result.current.previousTerms.length).toBe(8)
    expect(result.current.previousTerms).toStrictEqual(['foo9', 'foo8', 'foo7', 'foo6', 'foo5', 'foo4', 'foo3', 'foo2']);
  });
});
