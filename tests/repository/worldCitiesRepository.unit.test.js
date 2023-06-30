import worldCities from '../../src/domain/cities/repository/worldCitiesRespository.js'
import worldCitiesDataset from '../../dataset/world-cities_json.json'

describe("Testing for all worldCitiesRepository Actiona", ()=>{

    describe("Testing for getAllCitiesRepository Action",()=>{

        test("Should return all Cities", ()=>{
    
            const cities = worldCities.getAllCitiesRepository()
    
            expect(cities).toEqual(worldCitiesDataset)
        })
    })

    describe("Testing for searchCitiesByCountryName Action",()=>{

        test("Should return correctly all cityObjects related to Andorra when input is Andorra", ()=>{
    
            const cities = worldCities.searchCitiesByCountryName('Andorra')
    
            expect(cities).toEqual(getMockCities1())
        })
    
        test("Should return correctly all cityObjects related to Andorra when input is Andorr", ()=>{
    
            const cities = worldCities.searchCitiesByCountryName('Andorr')
    
            expect(cities).toEqual(getMockCities1())
        })
    
        test("Should return correctly all cityObjects related to Andorra when input is andorr", ()=>{
    
            const cities = worldCities.searchCitiesByCountryName('andorr')
    
            expect(cities).toEqual(getMockCities1())
        })

        test("Should return an empty array when input is nananana (Inexistent Country)", ()=>{
    
            const cities = worldCities.searchCitiesByCountryName('nananana')
            const response = [{
                "message": "No se encontraron ciudades para el país ingresado"
            }]
            expect(cities).toEqual(response)
        })

        test("Should return response when input is An", ()=>{

            const cities = worldCities.searchCitiesByCountryName('An')
            const response = [{
                "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
            },'InputLenght']
            expect(cities).toEqual(response)
        })

        test("Should return response when input is 1", ()=>{

            const cities = worldCities.searchCitiesByCountryName(1)
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(cities).toEqual(response)
        })

        test("Should return response when input is 2aaa", ()=>{

            const cities = worldCities.searchCitiesByCountryName('2aaa')
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(cities).toEqual(response)
        })
    })

    describe("Testing for searchCityByCityNameAndCountry Action",()=>{

        test("Should return an specific cityObject when city input is Pailin and country input is Cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('Pailin','Cambodia')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return an specific cityObject when city input is Pailin and country input is cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('Pailin','cambodia')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return an specific cityObject when city input is pailin and country input is Cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('pailin','Cambodia')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return an specific cityObject when city input is pailin and country input is cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('pailin','cambodia')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return an specific cityObject when city input is pailin and country input is camb", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('pailin','camb')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return an specific cityObject when city input is pai and country input is camb", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('pai','camb')

            expect(city).toEqual(getMockCities2())
        })

        test("Should return response when city input is nananana and country input is nanan", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('nananana','nanan')
            const response = [{
                "message": "No se encontraron ciudades para el país ingresado"
            }]
            expect(city).toEqual(response)
        })

        test("Should return response when city input is 1 and country input is Cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry(1,'Cambodia')
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(city).toEqual(response)
        })

        test("Should return response when city input is Pailin and country input is Cambodia", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('Pailin',1)
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(city).toEqual(response)
        })

        test("Should return response when city input is 1 and country input is 2", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry(1,2)
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(city).toEqual(response)
        })

        test("Should return response when city input is 1aaa and country input is 2aaa", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('1aaa','2aaa')
            const response = [{
                "message": "Solo se aceptan caracteres no numéricos"
            },'NumericInput']
            expect(city).toEqual(response)
        })

        test("Should return response when city input is va and country input is ch", ()=>{

            const city = worldCities.searchCityByCityNameAndCountry('va','ch')
            const response = [{
                "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
            },'InputLenght']
            expect(city).toEqual(response)
        })

        
    })


})


function getMockCities1(){
    return [
        {
          country: 'Andorra',
          geonameid: 3040051,
          name: 'les Escaldes',
          subcountry: 'Escaldes-Engordany'
        },
        {
          country: 'Andorra',
          geonameid: 3041563,
          name: 'Andorra la Vella',
          subcountry: 'Andorra la Vella'
        }
      ]
}

function getMockCities2(){
    return [{
        country: 'Cambodia',
        geonameid: 1830205,
        name: 'Pailin',
        subcountry: 'Pailin'
    }]
}