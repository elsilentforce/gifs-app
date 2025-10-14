import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.actions';
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';
import { giphySearchResponseMock } from './../../../tests/mocks/giphy.response.data';

describe('getGifsByQuery', () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset()
  });

  test('returns a list of gifs', async () => {
    // const gifs = await getGifsByQuery('foo');
    // const [gif1] = gifs;

    // expect(gifs.length).toEqual(10);

    // expect(gif1).toEqual({
    //   id: expect.any(String),
    //   height: expect.any(Number),
    //   width: expect.any(Number),
    //   title: expect.any(String),
    //   url: expect.any(String)
    // });
  });

  test('return a list of gifs', async () => {
    mock.onGet('/search').reply(200, giphySearchResponseMock);
    const gifs = await getGifsByQuery('foo');
    expect(gifs.length).toBe(10);

    gifs.forEach(gif => {
      expect(typeof gif.id).toBe('string');
      expect(typeof gif.title).toBe('string');
      expect(typeof gif.url).toBe('string');
      expect(typeof gif.width).toBe('number');
      expect(typeof gif.height).toBe('number');
    });
  });

  test('return an empty list if query parameter is not provided', async () => {
    const gifs = await getGifsByQuery('');
    expect(gifs.length).toBe(0);
  });

  test('handles error when API raises it', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error')
      .mockImplementation(() => { });

    mock.onGet('/search').reply(400, {
      data: {
        message: 'Bad Request'
      }
    });

    const gifs = await getGifsByQuery('foo');

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
