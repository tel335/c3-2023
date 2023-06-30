import request from 'supertest'
import { server, app } from '../../../src/index'
describe('GET endpoints con parámetros de longitud < 3', () => {
  it('debe devolver un status 400 y un objeto con el mensaje de "El país/ciudad ingresado debe tener al menos 3 caracteres"', async () => {
    const invalidParam = 'ab'; 
    const response = await request(app)
      .get(`/api/cities/by_country/${invalidParam}`)
      .expect(400);
    expect(response.body).toEqual({
      message: 'El país/ciudad ingresado debe tener al menos 3 caracteres'
    });
  });
});
