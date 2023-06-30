import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    // Si el country tiene numero
    if (/\d/.test(ctx.params.country)) { 
        ctx.status = 400;
        ctx.body = { message: "Solo se aceptan caracteres no numéricos" };
    } else {
        ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    }
    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    // Si city o country tienen numero
    if (/\d/.test(ctx.params.city) || /\d/.test(ctx.params.country)) { 
        ctx.status = 400;
        ctx.body = { message: "Solo se aceptan caracteres no numéricos" };
        return ctx;
    }

    const result = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country);

    if (result.length === 0) {
        ctx.status = 200;
        ctx.body = { message: "No se encontraron ciudades para el país ingresado" };
    } else {
        ctx.body = result;
    }

    return ctx;
}
