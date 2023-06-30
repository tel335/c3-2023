import request from 'supertest';
import { server, app } from '../../src/index';

/**
 * El objetivo de este test de integración es probar
 * el endpoint /api/cities/by_country/:country para evaluar si la aplicación responde
 * y devuelve las ciudades para un país en particular
 */
describe('GET /api/cities/by_country/:country', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta deben ser todas las ciudades de un pais', async () => {
    const country = 'United States'; // Pais a probar
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

    expect(response.status).toBe(200); 
    expect(response.body).toBeInstanceOf(Array); // Esperamos que la respuesta sea un array

    // Comprobamos que todas las ciudades devueltas son del país especificado
    response.body.forEach(city => {
      expect(city.country).toEqual(country);
    });
  });
});
