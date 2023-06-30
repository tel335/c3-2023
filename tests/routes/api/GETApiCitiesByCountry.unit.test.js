import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond with all the cities in that country and status 200', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/chile')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    test('should respond with a message "No se encontraron ciudades para el país ingresado" and status 200', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/xdpd')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('No se encontraron ciudades para el país ingresado')
    })

    test('should respond with a message "Solo se aceptan caracteres no numéricos"', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/1234')
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Solo se aceptan caracteres no numéricos')
    })

    test('should respond with a message "El país/ciudad ingresado debe tener al menos 3 caracteres" and status 400', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/e')
        expect(response.status).toBe(400)
        expect(response.body.message).toBe('El país/ciudad ingresado debe tener al menos 3 caracteres')
    })
})


