import request from 'supertest'
import { server, app } from '../../../src/index'
import worldCitiesDataset from '../../../dataset/world-cities_json.json'



describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })

    //TEST 1
    test('el servicio debe devolver todos los países disponibles', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body) && response.body.length == worldCitiesDataset.length).toBe(true)
    })



    //TEST 2:
    test('el servicio debe devolver una lista con resultados ', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/spain')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Check if the array has at least one element
    })
    test('el servicio debe devolver una lista con resultados ', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/cHiLe')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Check if the array has at least one element
    })





    //TEST 3:
    test('El servicio debe responder con mensaje de no se encontraron ciudades', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/papasfritas')
        expect(response.status).toBe(200)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "No se encontraron ciudades para el país ingresado"});
    })
    test('El servicio debe responder con mensaje de no se encontraron ciudades', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/pastel de choclo')
        expect(response.status).toBe(200)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "No se encontraron ciudades para el país ingresado"});
    })




    //TEST 4:
    test('El servicio debe responder con mensaje de no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Chile18')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "Solo se aceptan caracteres no numéricos"});
    })
    test('El servicio debe responder con mensaje de no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/8888888')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "Solo se aceptan caracteres no numéricos"});
    })


    
    //TEST 5:
    test('el servicio debe devolver una lista con resultados ', async () => {
        const response = await request(app.callback()).get('/api/city/SanTiago/country/chilE')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Check if the array has at least one element
    })
    test('el servicio debe devolver una lista con resultados ', async () => {
        const response = await request(app.callback()).get('/api/city/paRis/country/fRaNce')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Check if the array has at least one element
    })



    //TEST 6:
    test('El servicio debe responder con mensaje de no se encontraron ciudades', async () => {
        const response = await request(app.callback()).get('/api/city/SanTiago/country/papasfritas')
        expect(response.status).toBe(200)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "No se encontraron ciudades para el país ingresado"});
    })
    test('El servicio debe responder con mensaje de no se encontraron ciudades', async () => {
        const response = await request(app.callback()).get('/api/city/SanTiago/country/empanada')
        expect(response.status).toBe(200)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "No se encontraron ciudades para el país ingresado"});
    })



    //TEST 7:
    test('El servicio debe responder con mensaje de no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/city/SanTia18go/country/Chile18')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "Solo se aceptan caracteres no numéricos"});
    })
    test('El servicio debe responder con mensaje de no se aceptan caracteres numericos', async () => {
        const response = await request(app.callback()).get('/api/city/Paris96/country/France')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "Solo se aceptan caracteres no numéricos"});
    })




    //TEST 8:
    test('El servicio debe responder con que el input debe tener al menos 3 char', async () => {
        const response = await request(app.callback()).get('/api/city/Santiago/country/Cl')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"});
    })
    test('El servicio debe responder con que el input debe tener al menos 3 char', async () => {
        const response = await request(app.callback()).get('/api/city/Paris/country/fr')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"});
    })
    test('El servicio debe responder con que el input debe tener al menos 3 char', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Fr')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"});
    })
    test('El servicio debe responder con que el input debe tener al menos 3 char', async () => {
        const response = await request(app.callback()).get('/api/cities/by_country/Us')
        expect(response.status).toBe(400)
        // expect(Array.isArray(response.body)).toBe(true);
        // expect(response.body.length).toBe(0); // Check if the array has at least one element
        expect(response.body).toStrictEqual({"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"});
    })

})