/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :country
Entonces: debe devolver un status 200 y en el body, un arreglo con los objetos que hayan resultado de la búsqueda
*/

import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/cities/by_country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with an array of matching cities on a country', async () => {
    const country = 'chile';
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});