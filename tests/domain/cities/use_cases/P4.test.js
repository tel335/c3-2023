/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres alfanuméricos o solo númericos, independiente del case de :country
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

{
    "message": "Solo se aceptan caracteres no numéricos"
}
*/

import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/cities/by_country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with a message "Solo se aceptan caracteres no numéricos"', async () => {
    const country = 'Chile3';
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" });

  });
});