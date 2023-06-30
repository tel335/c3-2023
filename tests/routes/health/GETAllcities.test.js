import exports from "../../../src/domain/cities/repository/worldCitiesRespository"
import worldCitiesDataset from "../../../dataset/world-cities_json.json"

describe('Test cities actions', () => {

    test('test_returns_world_cities_dataset', () => {
        const result = exports.getAllCitiesRepository()
        expect(result).toEqual(worldCitiesDataset)
    })
})