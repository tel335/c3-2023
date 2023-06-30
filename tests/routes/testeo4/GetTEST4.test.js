import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/cities/by_country/:country', () => {
  it('debe devolver un status 400 y un objeto de mensaje de "Solo se aceptan caracteres no numéricos"', async () => {
    const country = '12345';

    const response = await request(app)
      .get(`/api/cities/by_country/${country}`)
      .expect(400);

    expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
  });
});
