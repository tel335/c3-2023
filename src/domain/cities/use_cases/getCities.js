import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const [message,error] = citiesRepository.searchCitiesByCountryName(ctx.params.country)
    ctx.body = message
    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    const [message,error] = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    ctx.body = message
    return ctx
}