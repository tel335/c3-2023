import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/city/:city/country/:country', () => {
  it('debe devolver un status 200 y un objeto con el mensaje de "No se encontraron ciudades"', async () => {
    const city = 'CiudadNoExistente';
    const country = 'PaisNoExistente';
    const response = await request(app)
      .get(`/api/city/${city}/country/${country}`)
      .expect(200);
    expect(response.body).toEqual({
      message: 'No se encontraron ciudades para el país ingresado'
    });
  });
});
