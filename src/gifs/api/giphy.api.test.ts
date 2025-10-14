import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";


describe('giphyApi', () => {
  const params = giphyApi.defaults.params;

  test('must be properly configured', () => {
    expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
    expect(params).toStrictEqual({
      lang: 'en',
      api_key: import.meta.env.VITE_GIPHY_API_KEY
    });
  });
});
