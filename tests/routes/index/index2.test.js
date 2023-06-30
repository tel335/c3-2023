import request from 'supertest'
import { server, app } from '../../../src/index' 

//test 2
describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })
    const pais = 'Andorra' //pais de prueba que sé q existe

    test('should respond with an array of city objects', async () => {
        const response = await request(app.callback()).get(`/api/cities/by_country/${pais}`)
        expect(response.status).toBe(200)

        if (response.body.hasOwnProperty('message')) {
            // lo q espero siesq no encuentra ciudades
            expect(response.body.message).toBe('No se encontraron ciudades para el país ingresado')
        } else {
            // lo q espero siesque encuentra
            expect(Array.isArray(response.body)).toBe(true)
            response.body.forEach(city => {
                expect(city).toHaveProperty('name')
                expect(city).toHaveProperty('country')
            })
        }
    })
})
