import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/city/:city/country/:country', () => {
  it('debe devolver un status 400 y un objeto con el mensaje de "Solo se aceptan caracteres no numéricos"', async () => {
    const city = '123City';
    const country = '456Country';
    const response = await request(app)
      .get(`/api/city/${city}/country/${country}`)
      .expect(400);
    expect(response.body).toEqual({
      message: 'Solo se aceptan caracteres no numéricos'
    });
  });
});
