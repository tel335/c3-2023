import request from 'supertest';//llamamos a la libreria de supertest para este caso particular
import { server, app } from '../../../src/index';//importamos tanto server como app del index para ser ocupados y llevar a cabo el request


describe('Primer caso de test', () => {//empezamos con la interfaz en la que se generara el test
  afterAll(() => {server.close();});//despues de terminar con el describe, cerramos el servicio para no ocupar recursos innecesariamente

  test('deberia pasar el test, si entrega todos los paises disponibles en el dataset', async () => {//testeamos que, para cuando el request se haga exitosamente (code 200), se entreguen por pantalla los paises que se obtuvieron en dicho request

    const response = await request(app.callback()).get('/api/cities');//aplicamos el callback, para asi esperar a ls respuesta (aplicamos async y await ya que son funciones asincronas, puesto que estamos trabajando con peticiones de la API)
    expect(response.status).toBe(200);//esperamos que la respuesta sea exitosa

    const paises_en_request = [...new Set(response.body.map(city_req => city_req.country))];//en caso de serlo, entregamos en esta variable los paises que esten en el campo "country" del body generado en el response, donde filtraremos para que no se repitan los paises que ya esten agregados
    console.log(paises_en_request)//entregamos por consola la lista de paises
  });
});