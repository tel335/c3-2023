import request from 'supertest'
import { server, app } from '../../../src/index' 

//test1
describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })
    test('el servicio debe devolver todos los países disponibles', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        response.body.forEach(city => { //toy verificando que tengan nombre,pais y geoid
            expect(city).toHaveProperty('name')
            expect(city).toHaveProperty('country')
            expect(city).toHaveProperty('geonameid')
            
        })
    })
})
