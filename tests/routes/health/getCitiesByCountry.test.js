import request from 'supertest';//llamamos a la libreria de supertest para este caso particular
import { server, app } from '../../../src/index';//importamos tanto server como app del index para ser ocupados y llevar a cabo el request

describe('Segundo caso de test', () => {//iniciamos el segundo caso de test, para retornar los resultados que hagan match con el input de pais

    test('deberia devolver los objetos que hagan match con el input de la ruta', async () => {
      const country = 'Andorra'; //pais con el cual realizar la busqueda (se puede cambiar por cualquier nombre de pais del dataset)

      const response = await request(app.callback()).get('/api/cities/by_country/:',{country});//realizamos el callback, donde hacemos la ruta con tal de que retorne los documentos que contengan el pais ingresado en la ruta
      expect(response.status).toBe(200);//en caso positivo, retornar code 200

      const documentos_encontrados = response.body;//asociamos a la variable el body de la respuesta al request
      console.log("Resultados de la búsqueda para ${country}:", documentos_encontrados);//entregamos por consola el body
    });
  });