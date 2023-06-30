import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/cities/por_pais/:pais', () => {
  it('debe devolver un status 200 y un arreglo con objetos coincidentes', async () => {
    const pais = 'USA'; // Reemplaza 'USA' por el país deseado para la prueba

    const response = await request(app.callback())
      .get(`/api/cities/por_pais/${pais}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((obj) => {
      expect(obj.pais.toLowerCase()).toEqual(pais.toLowerCase());
    });
  });

  it('debe devolver un status 200 y un arreglo vacío si no se encuentran resultados', async () => {
    const pais = 'XYZ';

    const response = await request(app.callback())
      .get(`/api/cities/por_pais/${pais}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });

  it('debe devolver un status 400 si el parámetro pais tiene menos de 3 caracteres', async () => {
    const pais = 'AB';

    await request(app.callback())
      .get(`/api/cities/por_pais/${pais}`)
      .expect(400);
  });
});
