import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (inputCountryName) => {

    if(inputCountryName.length < 3){
        return [{
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        },'InputLenght']
    }

    if(/\d/.test(inputCountryName) || typeof(inputCountryName) === 'number'){
        return [{
            "message": "Solo se aceptan caracteres no numéricos"
        },'NumericInput']
    }

    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(cityObject.country.toLowerCase().includes(inputCountryName.toLowerCase())) result.push(cityObject)
    })

    if(result.length === 0){
        return [{
            "message": "No se encontraron ciudades para el país ingresado"
        }]
    }
    return result
}

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {

    if(inputCityName.length < 3 || inputCountryName.length < 3){
        return [{
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        },'InputLenght']
    }

    if(/\d/.test(inputCityName) || /\d/.test(inputCountryName) || typeof(inputCityName) === 'number' || typeof(inputCountryName) === 'number'){
        return [{
            "message": "Solo se aceptan caracteres no numéricos"
        },'NumericInput']
    }

    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(cityObject.name.toLowerCase().includes(inputCityName.toLowerCase()) && cityObject.country.toLowerCase().includes(inputCountryName.toLowerCase())){
            result.push(cityObject)
        } 
    })

    if(result.length === 0){
        return [{
            "message": "No se encontraron ciudades para el país ingresado"
        }]
    }
    return result
}