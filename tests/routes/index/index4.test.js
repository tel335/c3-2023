import request from 'supertest'
import { server, app } from '../../../src/index'

//test4
describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })

    const invalidCountry = '123' // ejemplo de ciudadd invalidaa

    test('deberia responder con un mensaje para una ciudad que es invalida', async () => {
        const response = await request(app.callback()).get(`/api/cities/by_country/${invalidCountry}`)
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' })
    })
})
