import citiesRepository from '../repository/worldCitiesRespository'

const containsNumbers = (str) => {
    return /\d/.test(str);
}

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    if (containsNumbers(ctx.params.country)) {
        ctx.status = 400
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
        return ctx
    }
    if (ctx.params.country.length < 3) {
        ctx.status = 400
        ctx.body = { message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' }
        return ctx
    }
    else {
        ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country)
        if (Object.keys(ctx.body).length === 0) {
            ctx.status = 200
            ctx.body = { message: 'No se encontraron ciudades para el país ingresado' }
            return ctx
        }
        else {
            ctx.status = 200
            return ctx
        }
    }
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    if (containsNumbers(ctx.params.city) || containsNumbers(ctx.params.country)) {
        ctx.status = 400
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
        return ctx
    }
    if (ctx.params.country.length < 3 || ctx.params.city.length < 3) {
        ctx.status = 400
        ctx.body = { message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' }
        return ctx
    }
    else {
        ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
        if (Object.keys(ctx.body).length === 0) {
            ctx.status = 200
            ctx.body = { message: 'No se encontraron ciudades para el país ingresado' }
            return ctx
        }
        else {
            ctx.status = 200
            return ctx
        }
    }
}