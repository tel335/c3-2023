/*
Dado: Una consulta al servicio
Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y NO encuentre resultados, independiente del case de :country
Entonces: debe devolver un status 200 y en el body, un objeto con el siguiente formato:

{
    "message": "No se encontraron ciudades para el país ingresado"
}
*/

import request from 'supertest';
import { server, app } from '../../../../src/index';

describe('GET /api/cities/by_country/:country', () => {
  afterAll(() => {
    server.close();
  });

  test('should respond with a message "No se encontraron ciudades para el país ingresado"', async () => {
    const country = 'Chileeeeee';
    const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "No se encontraron ciudades para el país ingresado" });


  });
});