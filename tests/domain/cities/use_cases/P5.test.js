/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/city/:city/country/:country, tomando en cuenta que tanto :city como :country son un string de largo >= 3, con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :country y :city
Entonces: debe devolver un status 200 y en el body, un arreglo con los objetos que hayan resultado de la búsqueda
*/


import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/city/:city/country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with an array of matching cities on a country', async () => {
    const country = 'chile';
    const city = 'villarrica';
    const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});