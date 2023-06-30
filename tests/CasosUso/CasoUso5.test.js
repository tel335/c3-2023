import request from 'supertest';
import { server, app } from '../../src/index';

/**
 * El objetivo de este test de integración es probar
 * el endpoint /api/city/:city/country/:country para evaluar si la aplicación devuelve
 * el objeto correcto cuando se encuentran ciudades que coinciden con el país y la ciudad proporcionados
 */
describe('GET /api/city/:city/country/:country cuando no se encuentran', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta debe ser un objeto especifico cuando los resultados coincidan', async () => {
    const city = 'dubai'; 
    const country = 'united arab emirates'; 
    const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

    expect(response.status).toBe(200); 
  
    expect(response.body).toEqual([
      {
        "country": "United Arab Emirates",
        "geonameid": 292223,
        "name": "Dubai",
        "subcountry": "Dubai"
      }
    ]); 
  });
});
