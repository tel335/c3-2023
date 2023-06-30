import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

//No funciona, no clue why
function hasNumber(myString) {
    return /\d/.test(myString);
  }

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (inputCountryName) => {
    //solo inputs con letras y más largos que 3 chars
    if (hasNumber(inputCountryName)){
        return {
            "message": "Solo se aceptan caracteres no numéricos"
        };
    } 
    if (inputCountryName.length < 3) {
        return {
            "message": "El país ingresado debe tener al menos 3 caracteres"};
    }

    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCountryName.toLowerCase() === cityObject.country.toLowerCase()) result.push(cityObject)
    })
    return result
}

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {

    if (hasNumber(inputCountryName) || hasNumber(inputCityName)){
        return {
            "message": "Solo se aceptan caracteres no numéricos"
        };
    } 
    if (inputCountryName.length < 3 || inputCityName.length < 3) {
        return {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"};
    }
    
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCityName.toLowerCase() === cityObject.toLowerCase() && inputCountryName.toLowerCase() === cityObject.country.toLowerCase()) result.push(cityObject)
    })
    return result
}