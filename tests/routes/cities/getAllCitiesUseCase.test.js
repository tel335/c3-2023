import request from 'supertest'
import { server, app } from '../../../src/index'
import worldCitiesDataset from '../../../dataset/world-cities_json.json'

//Este test busca probar el caso de uso que devuelve todas las ciudadess
describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })

    test('Deberia retornar JSON con todas las ciudades', async () => { 
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(worldCitiesDataset)
    })
})
