import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/city/:city/country/:country', () => {
    afterAll(() => {
        server.close()
    })

    const city = 'les Escaldes' 
    const country = 'Andorra' 

    test('deberia responder con un arreglo de objetos de las ciudades ', async () => {
        const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`)
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        response.body.forEach(cityObject => {
            expect(cityObject).toHaveProperty('name')
            expect(cityObject).toHaveProperty('country')
            expect(cityObject).toHaveProperty('geonameid')
        })
    })
})
