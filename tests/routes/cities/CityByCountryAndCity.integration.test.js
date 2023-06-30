import request from 'supertest'
import { server, app } from '../../../src/index'
import cities from '../../../dataset/world-cities_json.json'


describe('GET /api/city/:city/country/:country', () => {
    afterAll(() => {
        server.close()
    })

    test('Debe devolver un status 200 y todas las ciudades de un pais segun :country y :city', async () => {
        const response = await request(app.callback()).get('/api/city/Albacete/country/Spain')
        expect(response.status).toBe(200)
        const filter = cities.filter(city => (city['name'] === 'Albacete' && city['country'] === 'Spain'))
        expect(response.body).toEqual(filter)
    })
    test('Debe devolver un status 200 y un mensaje cuando no se encuentran resultados', async () => {
        const response = await request(app.callback()).get('/api/city/Albacete/country/spain')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({"message": "No se encontraron ciudades para el país ingresado"})
    })
    test('Debe devolver un status 400 y un mensaje cuando se ingresan caracteres numericos a :country y/o :city', async () => {
        const response = await request(app.callback()).get('/api/city/Albacete1/country/1234')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ "message": "Solo se aceptan caracteres no numéricos"})
    })
    test('Debe devolver un status 400 y un mensaje cuando se ingresan c menos de 3 caracteres a :country y/o city', async () => {
        const response = await request(app.callback()).get('/api/city/12/country/1234')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"})
    })
})
