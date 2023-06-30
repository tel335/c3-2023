import request from 'supertest'
import { server, app } from '../../../src/index'
import cities from '../../../dataset/world-cities_json.json'


describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })

    test('Debe devolver todos los países disponibles', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(cities)
    })

})
