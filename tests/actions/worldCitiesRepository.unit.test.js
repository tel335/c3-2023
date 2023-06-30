import worldCitiesDataset from '../../../../dataset/world-cities_json.json';

describe("test de funciones de consultas de ciudades", () => {
    test('el servicio debe devolver todos los países disponibles', () => {
        const result = getAllCitiesRepository()
        expect(result).toEqual(worldCitiesDataset)
    })
    test('debe devolver un arreglo con los objetos que hayan resultado de la búsqueda', ()=> {
        const result = searchCitiesByCountryName('Chile')
        expect(result).toEqual(worldCitiesDataset.filter((cityObject) => {
            return cityObject.country === 'Chile'
        }
        //asumo que chile existe en el json
        ))
    })
})
