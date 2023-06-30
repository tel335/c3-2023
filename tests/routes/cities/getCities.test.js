import request from 'supertest'
import { server, app } from '../../../src/index'

describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })

    test('Deberia responder con todas las ciudades', async () => {
        const response = await request(app.callback()).get('/api/cities')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        response.body.forEach(city => {
            expect(city).toHaveProperty('country')
        })
    })
})

describe('GET /api/cities/by_country/:country', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con las ciudades correspondientes al país', async () => {
        const country = 'Argentina'; // País para la búsqueda
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

        expect(response.status).toBe(200); // Verificar que la respuesta tenga el código de estado 200
        expect(response.body).toBeInstanceOf(Array); // Verificar que la respuesta sea un array de objetos

        // Verificar que los objetos de la respuesta cumplan con los criterios de búsqueda
        response.body.forEach(city => {
            expect(city).toHaveProperty('country', expect.stringContaining(country));
        });
    });
});

describe('GET /api/cities/by_country/:country - No se encuentran ciudades', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con un mensaje de error cuando no se encuentran ciudades para el país', async () => {
        const country = 'NonexistentCountry'; // País inexistente para la búsqueda
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

        expect(response.status).toBe(200); // Verificar que la respuesta tenga el código de estado 200
        expect(response.body).toHaveProperty('message', 'No se encontraron ciudades para el país ingresado');
    });
});

describe('GET /api/cities/by_country/:country - Caracteres no numéricos en el nombre del país', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con un mensaje de error cuando se ingresan caracteres numéricos en el nombre del país', async () => {
        const country = 'Argentina123'; // País con caracteres numéricos en el nombre
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

        expect(response.status).toBe(400); // Verificar que la respuesta tenga el código de estado 400
        expect(response.body).toHaveProperty('message', 'Solo se aceptan caracteres no numéricos');
    });
});


describe('GET /api/city/:city/country/:country - Obtener ciudades por nombre de ciudad y nombre de país', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con las ciudades correspondientes al nombre de ciudad y nombre de país', async () => {
        const city = 'Buenos Aires'; // Nombre de la ciudad
        const country = 'Argentina'; // Nombre del país
        const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

        expect(response.status).toBe(200); // Verificar que la respuesta tenga el código de estado 200
        expect(response.body).toBeInstanceOf(Array); // Verificar que la respuesta sea un array de objetos

        // Verificar que los objetos de la respuesta cumplan con los criterios de búsqueda
        response.body.forEach(cityObj => {
            expect(cityObj).toHaveProperty('name', expect.stringContaining(city));
        });
    });
});

describe('GET /api/city/:city/country/:country - No se encontraron ciudades para el país ingresado', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con un mensaje de error cuando no se encuentren ciudades para el país ingresado', async () => {
        const city = 'CiudadNoExistente'; // Nombre de la ciudad inexistente
        const country = 'PaisNoExistente'; // Nombre del país inexistente
        const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

        expect(response.status).toBe(200); // Verificar que la respuesta tenga el código de estado 200
        expect(response.body).toHaveProperty('message', 'No se encontraron ciudades para el país ingresado');
    });
});

describe('GET /api/city/:city/country/:country - Solo se aceptan caracteres no numéricos', () => {
    afterAll(() => {
        server.close();
    });

    test('Debería responder con un mensaje de error cuando se ingresen caracteres numéricos', async () => {
        const city = '123'; // Nombre de la ciudad con caracteres numéricos
        const country = '456'; // Nombre del país con caracteres numéricos
        const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

        expect(response.status).toBe(400); // Verificar que la respuesta tenga el código de estado 400
        expect(response.body).toHaveProperty('message', 'Solo se aceptan caracteres no numéricos');
    });
});


describe('GET /api/city/:city/country/:country - Solo se aceptan valores de city > 3', () => {
    afterAll(() => {
        server.close();
    });

    test('Deberia responder un mensaje de error para cuando el largo de los parametros es < 3', async () => {
        const city = 'arg'; // Nombre de la ciudad con caracteres numéricos
        const country = 'buen'; // Nombre del país con caracteres numéricos
        const response = await request(app.callback()).get(`/api/city/${city}/country/${country}`);

        expect(response.status).toBe(400); // Verificar que la respuesta tenga el código de estado 400
        expect(response.body).toHaveProperty('message', 'El país/ciudad ingresado debe tener al menos 3 caracteres');
    });
});

describe('GET /api/cities/by_country/:country - Largo de country', () => {
    afterAll(() => {
        server.close();
    });

    test('Deberia responder un mensaje de error para cuando el largo de los parametros es < 3', async () => {
        const country = 'Arg'; // País con caracteres numéricos en el nombre
        const response = await request(app.callback()).get(`/api/cities/by_country/${country}`);

        expect(response.status).toBe(400); // Verificar que la respuesta tenga el código de estado 400
        expect(response.body).toHaveProperty('message', 'El país/ciudad ingresado debe tener al menos 3 caracteres');
    });
});


