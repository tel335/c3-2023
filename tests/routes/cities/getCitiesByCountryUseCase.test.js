import request from 'supertest'
import { server, app } from '../../../src/index'

//Este test busca probar el caso de uso en que se busca por pais y verifica que independiente del string ingresado, debe haber una respuesta valida
describe('/api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })

    test('Deberia responder con codigo 200 y devolver un arreglo con resultados', async () => { 
        const validString = 'chile'
        console.log('/api/cities/by_country/'.concat(validString))
        const response = await request(app.callback()).get('/api/cities/by_country/'.concat(validString))
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length > 0).toBe(true)
    })
})