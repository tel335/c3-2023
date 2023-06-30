import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const country = ctx.params.country.toLowerCase()

    if (/^\d+$/.test(country)) { //siesq se ingresa un "pais" con solo numeros
        ctx.status = 400
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
    } else {
        const cities = citiesRepository.searchCitiesByCountryName(country)

        if (cities.length === 0) {
            ctx.status = 200
            ctx.body = { message: 'No se encontraron ciudades para el país ingresado' }
        } else {
            ctx.status = 200
            ctx.body = { cities }
        }
    }

    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    return ctx
}