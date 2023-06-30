/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a cualquiera de los endpoints que reciban parámetros y el largo sea < 3
Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

{
    "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
}
*/

import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/city/:city/country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with a message "El país/ciudad ingresado debe tener al menos 3 caracteres"', async () => {
    const country = 'ch';
    const city = 'villa3';
    const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "El país/ciudad ingresado debe tener al menos 3 caracteres" });
    const country2 = 'chile';
    const city2 = 'vi';
    const response2 = await request(app.callback()).get(`/api/city/${city2}/country/${country2}`);
    expect(response2.status).toBe(400);
    expect(response2.body).toEqual({ message: "El país/ciudad ingresado debe tener al menos 3 caracteres" });

  });
});