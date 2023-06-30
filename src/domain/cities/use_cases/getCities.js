import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country)
    if(ctx.params.country.length<=3){
        ctx.status = 400
        ctx.body = { message: "El país/ciudad ingresado debe tener al menos 3 caracteres" }
        return ctx
    }
    if(ctx.body.country === undefined){ 
        ctx.status= 200
        ctx.body={"message": "No se encontraron ciudades para el país ingresado"}
        return ctx
    }
    if(ctx.params.country.match(/\d+/g)){
        ctx.status = 400
        ctx.body = { message: "Solo se aceptan caracteres no numéricos" }
        return ctx
    }
    ctx.status = 200
    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)

    //si la consulta es valida pero no se encuentra
    if(ctx.body.body.city === undefined){
        ctx.status= 200
        ctx.body={"message": "No se encontraron ciudades para el país ingresado"}
        return ctx
    }
    //si la consulta es invalida
    if(ctx.params.city.length<=3 || ctx.params.country.length<=3){
        ctx.status = 400
        ctx.body = { message: "El país/ciudad ingresado debe tener al menos 3 caracteres" }
        return ctx
    }
    //si la consulta tiene numeros 
    if(ctx.params.city.match(/\d+/g) || ctx.params.country.match(/\d+/g)){ 
        ctx.status = 400
        ctx.body = { message: "Solo se aceptan caracteres no numéricos" }
        return ctx
    }

    ctx.body=200
    return ctx
}
