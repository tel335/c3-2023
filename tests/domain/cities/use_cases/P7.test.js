/**

Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/city/:city/country/:country, tomando en cuenta que tanto :city como :country son un string de largo >= 3, con caracteres alfanuméricos o solo númericos, independiente del case de :country y :city
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

{
    "message": "Solo se aceptan caracteres no numéricos"
}

*/

import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/city/:city/country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with a message', async () => {
    const country = 'chile';
    const city = 'villa3';
    const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" });

  });
});