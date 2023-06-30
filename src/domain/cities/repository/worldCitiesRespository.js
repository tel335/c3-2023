import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (inputCountryName) => { //Modificar el algoritmo de busqueda para que sea case insensitive
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if((inputCountryName.toLowerCase()) === (cityObject.country.toLowerCase())) result.push(cityObject)
    })
    return result
}

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCityName === cityObject.name && inputCountryName === cityObject.country) result.push(cityObject)
    })
    return result
}