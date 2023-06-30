import request from 'supertest'
import { server, app } from '../../../src/index'
import worldCitiesDataset from '../../../dataset/world-cities_json.json'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond with all the cities', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body) && response.body.length == worldCitiesDataset.length).toBe(true)
    })
})
