import getCitiesUseCase from '../../../src/domain/cities/use_cases/getCities'
import worldCitiesDataset from '../../../dataset/world-cities_json.json'
import sinon from 'sinon'
import { server, app } from '../../../src/index'
import request from 'supertest'

describe('Test getCities', () => {

   beforeEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        server.close()
    })

    /**
     * Se verifica que se devuelvan todas los paises disponibles
     */
    test('Debería devolver todos los países disponibles', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(worldCitiesDataset)
    })

    /**
     * Se verifica que la variable tenga más de 3 caracteres
     */

    test('Si la variable tiene menos de 3 caracteres, retorna un mensaje alusivo y codigo 400', async () => {
        const response1 = await request(app.callback()).get('/api/cities/by_country/aa')
        expect(response1.status).toBe(400)
        expect(response1.body).toEqual({
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        })

        const response2 = await request(app.callback()).get('/api/city/Chile/country/aa')
        expect(response2.status).toBe(400)
        expect(response2.body).toEqual({
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        })

        const response3 = await request(app.callback()).get('/api/city/ss/country/aa')
        expect(response3.status).toBe(400)
        expect(response3.body).toEqual({
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        })
    })

    /**
     * Se verifica que se devuelva un array con los datos de busqueda independiente del case de
     * :country. y que devuelva codigo 200
     */
    test('Debería devolver el pais sin importar el case del input', async () => {
        const response1 = await request(app.callback()).get('/api/cities/by_country/Chile')
        expect(response1.status).toBe(200)
        expect(Array.isArray(response1.body)).toBe(true); // Se verifica que sea un arreglo
        expect(response1.body.length).toBeGreaterThan(0); // Se verifica que sea mayor a 0 el arreglo

        const response2 = await request(app.callback()).get('/api/cities/by_country/chile')
        expect(response2.status).toBe(200)
        expect(Array.isArray(response2.body)).toBe(true);
        expect(response2.body.length).toBeGreaterThan(0);

        const response3 = await request(app.callback()).get('/api/cities/by_country/CHILE')
        expect(response3.status).toBe(200)
        expect(Array.isArray(response3.body)).toBe(true);
        expect(response3.body.length).toBeGreaterThan(0);

    })

    /**
     * Se verifica que al no encontrar resultados, devueva un codigo 200 y
     * el mensaje "message": "No se encontraron ciudades para el país ingresado"
     */
    test('Debería devolver el mensaje: "No se encontraron ciudades para el país ingresado" y codigo 200', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/asdf')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });

    })

    /**
     * Se verifica que no contenga numeros, de lo contrario devuelva un codigo 400 y
     * el mensaje "message": "Solo se aceptan caracteres no numéricos"
     */
    test('Debería devolver el mensaje: message": "Solo se aceptan caracteres no numéricos" y codigo 400', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Chile2234')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });

    })

    /**
     * Se verifica que se devuelva un array con los datos de busqueda independiente del case de
     * :country y de :city. y que devuelva codigo 200
     */
    test('Debería devolver resultados sin importar los case de los inputs', async () => {
        const response1 = await request(app.callback()).get('/api/city/Valparaíso/country/Chile')
        expect(response1.status).toBe(200)
        expect(Array.isArray(response1.body)).toBe(true);
        expect(response1.body.length).toBeGreaterThan(0);

        const response2 = await request(app.callback()).get('/api/city/SANTIAGO/country/CHILE')
        expect(response2.status).toBe(200)
        expect(Array.isArray(response1.body)).toBe(true);
        expect(response2.body.length).toBeGreaterThan(0);

        const response3 = await request(app.callback()).get('/api/city/santiago/country/chile')
        expect(response3.status).toBe(200)
        expect(Array.isArray(response1.body)).toBe(true);
        expect(response3.body.length).toBeGreaterThan(0);

    })
})

