import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (inputCountryName) => {
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCountryName === cityObject.country) result.push(cityObject)
    })

    if (result.length === 0) {
        return { message: "No se encontraron ciudades para el país ingresado" };
    }

    return result
}

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCityName.toLowerCase() === cityObject.name.toLowerCase() && 
           inputCountryName.toLowerCase() === cityObject.country.toLowerCase()) 
           result.push(cityObject)
    })
    
    if (result.length === 0) {
        return { message: "No se encontraron ciudades para el país ingresado" };
    }

    return result
}
