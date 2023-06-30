import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    let country_input = ctx.params.country
    country_input = country_input.toLowerCase();
    const regex = /^[a-zA-Z]+$/;

    if (typeof country_input !== "string" || country_input.length <= 3) {
        ctx.status = 400
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
    }else{
        ctx.body = citiesRepository.searchCitiesByCountryName(country_input)
        if (ctx.body.length == 0){
            ctx.body = {
                "message": "No se encontraron ciudades para el país ingresado"
            }
        }
        if (!(regex.test(country_input))){
            ctx.status = 400
            ctx.body = {
                "message": "Solo se aceptan caracteres no numéricos"
            }
        }
    }
    
    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    let country_input = ctx.params.country
    let city_input = ctx.params.city

    country_input = country_input.toLowerCase();
    city_input = city_input.toLowerCase();

    const regex = /^[a-zA-Z]+$/;

    if (typeof country_input !== "string" || typeof city_input !== "string" || country_input.length < 3 || city_input.length < 3){
        ctx.status = 400
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
    }else{
        ctx.body = citiesRepository.searchCityByCityNameAndCountry(city_input, country_input)
        if (ctx.body.length == 0){
            ctx.body = {
                "message": "No se encontraron ciudades para el país ingresado"
            }
        }
        if (!(regex.test(country_input)) || !(regex.test(city_input))){
            ctx.status = 400
            ctx.body = {
                "message": "Solo se aceptan caracteres no numéricos"
            }
        }
    }
    return ctx
}