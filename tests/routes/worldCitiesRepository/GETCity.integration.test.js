import request from 'supertest'
import { server, app } from '../../../src/index'
import sinon from 'sinon'
import worldCitiesDataset from '../../../../dataset/world-cities_json.json'
import worldCitiesRepository from '../../../src/domain/cities/repository/worldCitiesRespository'

describe('GET /api/cities', () => {
    afterAll(() => {
        server.close()
    })
    test(" el servicio debe devolver todos los países disponibles", async () => { 
        sinon.stub(worldCitiesRepository, 'getAllCitiesRepository').returns(getMockCitiesRepository())
        const response = await request(app.callback()).get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body).toEqual( getMockCitiesRepository())
    })
})

describe('GET /api/cities/by_country/:country', () => {
    beforeEach(() => {
        sinon.restore()
    })
    afterAll(() => {
        server.close()
    })
    test('debe devolver un arreglo con los objetos que hayan resultado de la búsqueda', async () => {
        sinon.stub(worldCitiesRepository, 'searchCitiesByCountryName').returns(getMockCitiesRepositoryByCountry('Chile'))
        const response = await request(app.callback()).get('/api/cities/by_country/Chile')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(getMockCitiesRepositoryByCountry('Chile')  
        )
    })
})

describe('GET /api/city/:city/country/:country', () => {
})



        


function getMockCitiesRepository() {
    //retornar ciudades del dataset
    return worldCitiesDataset
}

function getMockCitiesRepositoryByCountry(country) {
    //retornar ciudades del dataset
    return worldCitiesDataset.filter((cityObject) => {
        return cityObject.country === country
    })
}