import request from 'supertest';
import { server, app } from '../../src/index';

/**
 * El objetivo de este test de integración es probar
 * el endpoint /api/cities/by_country/:country para evaluar si la aplicación rechaza
 * la solicitud cuando el parámetro de país contiene caracteres numéricos
 */
describe('GET /api/cities/by_country/:country cuando hay un numero en el nombre del pais', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta debe ser un mensaje cuando existe un numero en el nombre del pais', async () => {
    const country = '123abc'; // Texto que contiene numeros
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

    expect(response.status).toBe(400); // Nos solicitan el estado 400
    expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" }); 
  });
});
