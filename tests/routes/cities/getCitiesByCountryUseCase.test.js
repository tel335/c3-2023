import request from 'supertest'
import { server, app } from '../../../src/index'

//Este test busca probar los casos de uso que tengan que ver con busqueda por pais
describe('/api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })

    test('Si se encuentran resultados, deberia responder con codigo 200 y devolver un arreglo con los resultados', async () => { 
        const validString = 'chile'
        const response = await request(app.callback()).get('/api/cities/by_country/'.concat(validString))
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length > 0).toBe(true)
    })

    test('Si no se encuentran resultados, deberia responder con codigo 200 y un objeto de formato especifico', async () => { 
        const invalidCountry = 'chule'
        const expObj = {
            "message": "No se encontraron ciudades para el país ingresado"
        }
        const response = await request(app.callback()).get('/api/cities/by_country/'.concat(invalidCountry))
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expObj)
    })

    test('Si se envia como parametro un string con caracteres numericos, deberia responder con codigo 400 y un objeto de formato especifico', async () => { 
        const NumString = 'Numericos98'
        const expObj = {
            "message": "Solo se aceptan caracteres no numéricos"
        }
        const response = await request(app.callback()).get('/api/cities/by_country/'.concat(NumString))
        expect(response.status).toBe(400)
        expect(response.body).toEqual(expObj)
    })
})