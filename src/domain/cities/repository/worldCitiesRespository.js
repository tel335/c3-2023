import context from 'koa/lib/context'
import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (ctx) => { //Modificar el algoritmo de busqueda para que sea case insensitive
    let inputCountryName = ctx.params.country
    //Modificar funcion para que verifique que el string sea valido
    const isNumeric = /\d/.test(inputCountryName)
    if (isNumeric) {
        ctx.status = 400
        return {
        "message": "Solo se aceptan caracteres no numéricos"
    }}
    const result = []
    let found = false
    worldCitiesDataset.forEach((cityObject) => {
        if((inputCountryName.toLowerCase()) === (cityObject.country.toLowerCase())) {
            result.push(cityObject)
            found = true
        }
    })

    if (!found) { //Agregada funcionalidad que notifica si no se encontraron ciudades
        return {
            "message": "No se encontraron ciudades para el país ingresado"
        }
    }
    return result
}

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCityName === cityObject.name && inputCountryName === cityObject.country) result.push(cityObject)
    })
    return result
}