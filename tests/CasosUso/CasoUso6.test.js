import request from 'supertest';
import { server, app } from '../../src/index';

describe('GET /api/city/:city/country/:country cuando no se encuentran resultados', () => {
  afterAll(() => {
    server.close()
  });

  test('La respuesta debe ser un mensaje cuando no existan ciudades o paises', async () => {
    const city = 'nonExistentCity'; // Una ciudad random que no esta en nuestro data
    const country = 'nonExistentCountry'; // Un país random que no esta en nuestro data
    const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "No se encontraron ciudades para el país ingresado" }); 
  });
});
