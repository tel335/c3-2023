import request from 'supertest'
import { server, app } from '../../../src/index'

//PRUEBAS HEALTH

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})

//PRUEBAS APARTADO 2_3

describe('Get /api/cities/by_country1', () => {

    test('test_get_cities_by_country', async () => {
      const paisReal = 'Albania'; // País existente en el conjunto de datos
      const paisNoReal = 'XYZ'; // País no existente en el conjunto de datos
      const expectedStatus = 200; // Estado esperado 
  
      // Realizamos solicitud
      const responseExisting = await request(app.callback()).get(`/api/cities/by_country/${paisReal}`);
  
      expect(responseExisting.status).toEqual(expectedStatus); // Verificar el estado de la respuesta
  
      // Verificar el cuerpo de la respuesta
      expect(Array.isArray(responseExisting.body)).toBe(true); // Verificar si el cuerpo es un arreglo
      expect(responseExisting.body.length).toBeGreaterThan(0); // Verificar si el arreglo tiene elementos
  
      // Realizar la solicitud al endpoint con un país no existente
      const responseNonExisting = await request(app.callback()).get(`/api/cities/by_country/${paisNoReal}`);
  
      // Verificar el estado de la respuesta
      expect(responseNonExisting.status).toEqual(expectedStatus); 
  
      // Verificar que el país existente contiene solo letras
        expect(/^[A-Za-z]+$/.test(paisReal)).toBe(true);

      // Verificar el cuerpo de la respuesta
      expect(responseNonExisting.body.message).toBe('No se encontraron ciudades para el país ingresado');

    });
  });
  
//PRUEBAS APARTADO 4
describe('Get /api/cities/by_country_4', () => {
    

    test('test_get_cities_by_country_4', async () => {
      const paisAlfanumerico = 'Abc123'; // País alfanumérico
      const paisNumerico = '123'; // País numérico
  
      // Realizamos la solicitud al endpoint con un país alfanumérico
      const responseAlfanumerico = await request(app.callback()).get(`/api/cities/by_country/${paisAlfanumerico}`);
  
      // Verificar el estado de la respuesta
      expect(responseAlfanumerico.status).toEqual(400);
  
      // Verificar el cuerpo de la respuesta
      expect(responseAlfanumerico.body).toMatchObject({
        message: 'Solo se aceptan caracteres no numéricos'
      });
  
      // Realizar la solicitud al endpoint con un país numérico
      const responseNumerico = await request(app.callback()).get(`/api/cities/by_country/${paisNumerico}`);
  
      // Verificar el estado de la respuesta
      expect(responseNumerico.status).toEqual(400);
  
      // Verificar el cuerpo de la respuesta
      expect(responseNumerico.body).toMatchObject({
        message: 'Solo se aceptan caracteres no numéricos'
      });
    });
  });
  