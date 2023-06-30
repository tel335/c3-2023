import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/cities/by_country/:country', () => {
  it('debe devolver un status 200 y un objeto de mensaje de "No se encontraron ciudades"', async () => {
    const country = 'NonexistenteCountry';

    const response = await request(app)
      .get(`/api/cities/by_country/${country}`)
      .expect(200);

    expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
  });
});
