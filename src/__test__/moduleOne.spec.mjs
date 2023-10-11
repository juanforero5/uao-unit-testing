import {
  describe, test, expect, jest,
} from '@jest/globals';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { divide, getPosts } from '../moduleOne.mjs';

// Define una suite de pruebas
describe('divide', () => {
  test('Debe dividir dos números correctamente', () => {
    // Prueba una división válida
    expect(divide(2000, 50)).toBe(40);
  });

  test('Debe lanzar un error al dividir por cero', () => {
    // Usa Jest para capturar el error lanzado
    expect(() => divide(8, 0)).toThrowError('Error dividing by zero');
  });
});

describe('getPosts', () => {
  test('debería devolver datos válidos', async () => {
    // Crea una instancia de MockAdapter para axios
    const mock = new MockAdapter(axios);

    // Configura una respuesta simulada para la solicitud GET a la URL esperada
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, [
      {
        userId: 1, id: 1, title: 'Post 1', body: 'Body 1',
      },
      {
        userId: 1, id: 2, title: 'Post 2', body: 'Body 2',
      },
    ]);

    // Llama a la función getPosts
    const result = await getPosts();

    // Verifica que los datos devueltos sean los esperados
    expect(result).toEqual([
      {
        userId: 1, id: 1, title: 'Post 1', body: 'Body 1',
      },
      {
        userId: 1, id: 2, title: 'Post 2', body: 'Body 2',
      },
    ]);
  });

  test('debería manejar errores adecuadamente', async () => {
    // Crea una instancia de MockAdapter para axios
    const mock = new MockAdapter(axios);

    // Configura una respuesta simulada que generará un error (código de respuesta 500)
    mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(500);

    // Llama a la función getPosts y verifica que maneje adecuadamente el error
    await expect(getPosts()).rejects.toThrowError(500);
  });
});
