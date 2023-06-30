import request from 'supertest'
import { server, app } from '../../../src/index'
import data from '../../../dataset/world-cities_json.json' 
const { getAllCitiesRepository, searchCitiesByCountryName, searchCityByCityNameAndCountry } = require('../../../src/domain/cities/repository/worldCitiesRespository')

describe('Probar endpoints de cities', () => {
    afterAll(() => {
        server.close()
    })

    // 1
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/cities
    // Entonces: el servicio debe devolver todos los países disponibles
    test('Deberia retornar todas las ciudades en la base de datos', async () => {
        const result = await request(app.callback()).get('/api/cities')
        expect(result.body).toEqual(data)
    })
    
    // 2
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :country
    // Entonces: debe devolver un status 200 y en el body, un arreglo con los objetos que hayan resultado de la búsqueda
    // Errores: cuando los case entre la api call y el argumento de la funcion difieren, no se retornan los mismos datos
    // Medida: aplicar un lowercase para el argumento
    test('Deberia retornar un status 200 y en el body un arreglo con los resultados', async () => {
        const result = await request(app.callback()).get('/api/cities/by_country/Chile')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(searchCitiesByCountryName('cHile'))
    })

    // 3
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres compuestos por solo letras y NO encuentre resultados, independiente del case de :country
    // Entonces: debe devolver un status 200 y en el body, un objeto con el siguiente formato:
    // {
    //     "message": "No se encontraron ciudades para el país ingresado"
    // }
    // Error: no se enviaba el mensaje correspondiente ni status = 200
    // Medida: se agrego dicha informacion al contexto que retorna el controlador
    test('Deberia retornar un mensaje que indique que no se encontraron ciudades para el pais ingresado', async () => {
        const result = await request(app.callback()).get('/api/cities/by_country/PaisDeLasMaravillas')
        expect(result.status).toBe(200)
        expect(result.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado'})
    })
    
    // 4
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/cities/by_country/:country, tomando en cuenta que :country es un string de largo >= 3, con caracteres alfanuméricos o solo númericos, independiente del case de :country
    // Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
    // {
    //     "message": "Solo se aceptan caracteres no numéricos"
    // }
    // Error: no se responde con status 400
    // Medida: se agrega la logica para detectar numeros y retornar el status y el mensaje correspondiente
    test('Deberia retornar un mensaje indicando que no se aceptan numeros en las consultas con status 400', async () => {
        const result = await request(app.callback()).get('/api/cities/by_country/Chile01')
        expect(result.status).toBe(400)
        expect(result.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos'})
    })
    
    // 5
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/city/:city/country/:country, tomando en cuenta que tanto :city como :country son un string de largo >= 3, con caracteres compuestos por solo letras y encuentre resultados, independiente del case de :country y :city
    // Entonces: debe devolver un status 200 y en el body, un arreglo con los objetos que hayan resultado de la búsqueda
    // Error: en caso de lower caso tanto para ciudad como para el pais, se cae
    // Medida: se aplica toLowerCase() tanto para los query params como para los datos de la BBDD
    test('Deberia retornar un status 200 y en el body un arreglo con los resultados', async () => {
        const result = await request(app.callback()).get('/api/city/Santiago/country/Chile')
        expect(result.status).toBe(200)
        expect(result.body).toEqual(searchCityByCityNameAndCountry('santiago', 'chile'))
    })

    // 6
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/city/:city/country/:country, tomando en cuenta que tanto :city como :country son un string de largo >= 3, con caracteres compuestos por solo letras y NO encuentre resultados, independiente del case de :country y :city
    // Entonces: debe devolver un status 200 y en el body, un objeto con el siguiente formato:
    // {
    //     "message": "No se encontraron ciudades para el país ingresado"
    // }
    test('Deberia retornar un mensaje indicando que no se encontraron resultados con status 200', async () => {
        const result = await request(app.callback()).get('/api/city/CiudadFicticia/country/PaisFicticio')
        expect(result.status).toBe(200)
        expect(result.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado'})
    })
    
    // 7
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a /api/city/:city/country/:country, tomando en cuenta que tanto :city como :country son un string de largo >= 3, con caracteres alfanuméricos o solo númericos, independiente del case de :country y :city
    // Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
    // {
    //     "message": "Solo se aceptan caracteres no numéricos"
    // }
    test('Deberia retornar un status 400 en caso de que tanto la ciudad como el pais contengan numeros en sus nombres', async () => {
        const result = await request(app.callback()).get('/api/city/Santiago007/country/Chile')
        expect(result.status).toBe(400)
        expect(result.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos'})
    })
    
    // 8
    // Dado: Una consulta al servicio
    // Cuando: realice una solicitud a cualquiera de los endpoints que reciban parámetros y el largo sea < 3
    // Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:
    // {
    //     "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
    // }
    test('Deberia retornar status 400 y un mensaje alusivo en caso de que los nombres tengan largo menor a 3', async () => {
        const result1 = await request(app.callback()).get('/api/cities/by_country/C')
        const result2 = await request(app.callback()).get('/api/city/S/country/C')
        expect(result1.status).toBe(400)
        expect(result2.status).toBe(400)
        expect(result1.body).toEqual({ message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' })
        expect(result2.body).toEqual({ message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' })
    })
})







