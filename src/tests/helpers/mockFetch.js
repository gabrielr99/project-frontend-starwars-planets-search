import testData from './mockData';

export const mockFetch = () => jest
  .fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(testData) }));
