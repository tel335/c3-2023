import request from 'supertest'
import { server, app } from '../../../src/index' 



describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })
    const paisquenoexiste = 'nomellamo' // Un país que sabes que no existe en tus datos
    test('No se encontraron ciudades para el país ingresado', async () => {
        const response = await request(app.callback()).get(`/api/cities/by_country/${paisquenoexiste}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' })
    })
})
