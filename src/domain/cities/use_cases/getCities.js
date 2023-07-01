import citiesRepository from '../repository/worldCitiesRespository'

function contieneSoloNoNumericos(string) {
    return /^[^0-9]+$/.test(string);
  }

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    if (ctx.params.country.length < 3) {
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        ctx.status = 400
        return ctx
    }
    if (contieneSoloNoNumericos(ctx.params.country)) {
        ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country)
        return ctx
    }else{
        ctx.body = {
            "message": "Solo se aceptan caracteres no numéricos"
        }
        ctx.status = 400
        return ctx
    }

    
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    if (ctx.params.country.length < 3 || ctx.params.city.length < 3) {
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        ctx.status = 400
        return ctx
    }

    if (contieneSoloNoNumericos(ctx.params.city) || contieneSoloNoNumericos(ctx.params.country)) {
        ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
        return ctx
    }else{
        ctx.body = {
            "message": "Solo se aceptan caracteres no numéricos"
        }
        ctx.status = 400
        return ctx
    }
    
}