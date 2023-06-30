import request from 'supertest';
import { server, app } from '../../src/index';

/**
 * El objetivo de este test de integración es probar
 * el endpoint /api/cities/by_country/:country para evaluar si la aplicación responde
 * y devuelve un mensaje cuando no hay ciudades para un país en particular
 */
describe('GET /api/cities/by_country/:country cuando no hay ciudades', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta debe ser un mensaje cuando no se encuentren ciudades para un pais', async () => {
    const country = 'España'; // No existe este pais en la base de datos
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

    expect(response.status).toBe(200); 
    expect(response.body).toEqual({ message: "No se encontraron ciudades para el país ingresado" }); 
  });
});
