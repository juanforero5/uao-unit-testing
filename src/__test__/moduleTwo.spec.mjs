import {
  describe, test, expect, jest,
} from '@jest/globals';
import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';

describe('generaSecuenciaFibonacci', () => {
  test('genera secuencia de Fibonacci hasta el límite', () => {
    expect(generateFibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });

  test('arroja un error por límite no válido', () => {
    expect(() => generateFibonacciSequence(0)).toThrow('El límite debe ser mayor que 0');
  });
});

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [{ name: 'Gustavo' }, { name: 'Claudia' }] })),
}));
describe('getUsers', () => {
  test('recupera datos del usuario', async () => {
    const users = await getUsers();
    expect(users.length).toBe(2);
  });
  test('arroja error porque no encuentra usuarios', async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    jest.requireMock('axios').get.mockResolvedValueOnce({ data: [] });
    await expect(getUsers()).rejects.toThrow('Usuario no encontrado');
  });
  test('arroja error para Claudia en usuarios', async () => {
    jest
      .spyOn(global.console, 'error').mockImplementation(() => {});
    jest.requireMock('axios').get.mockResolvedValueOnce({ data: [{ name: 'Claudia' }] });
    await expect(getUsers()).rejects.toThrow('Claudia no está permitida');
  });
});
