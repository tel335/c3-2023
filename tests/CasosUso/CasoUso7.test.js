// __tests__/integration/CasoUso7.test.js
import request from 'supertest';
import { server, app } from '../../src/index';

describe('GET /api/city/:city/country/:country cuando hay se pasan numeros', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta debe ser un mensaje', async () => {
    let city = 'Dubai1'; 
    let country = 'United Arab Emirates'; // Un país que existe en tu conjunto de datos
    let response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);
    expect(response.status).toBe(400); 
    expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" }); 

    city = 'Dubai'; 
    country = 'United Arab Emirates1'; // Un país que contiene un número
    response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);
    expect(response.status).toBe(400); 
    expect(response.body).toEqual({ message: "Solo se aceptan caracteres no numéricos" });
  });
});
