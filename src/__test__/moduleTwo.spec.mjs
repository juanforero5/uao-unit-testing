import {
  describe, test, expect, jest,
} from '@jest/globals';
import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';

describe('generateFibonacciSequence', () => {
  test('generates Fibonacci sequence up to limit', () => {
    expect(generateFibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });

  test('throws an error for invalid limit', () => {
    expect(() => generateFibonacciSequence(0)).toThrow('Limit must be greater than 0');
  });
});

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [{ name: 'John' }, { name: 'Clementine' }] })),
}));
describe('getUsers', () => {
  test('fetches user data', async () => {
    const users = await getUsers();
    expect(users.length).toBe(2);
  });
  test('throws an error for no users found', async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    jest.requireMock('axios').get.mockResolvedValueOnce({ data: [] });
    await expect(getUsers()).rejects.toThrow('No users found');
  });
  test('throws an error for Clementine in users', async () => {
    jest
      .spyOn(global.console, 'error').mockImplementation(() => {});
    jest.requireMock('axios').get.mockResolvedValueOnce({ data: [{ name: 'Clementine' }] });
    await expect(getUsers()).rejects.toThrow('Clementine is not allowed');
  });
});
