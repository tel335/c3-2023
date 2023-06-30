import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    if ((ctx.params.country).length >= 3) {
        try {
            if (/\d/.test(ctx.params.country)) {
                ctx.status = 400;
                ctx.body = {
                    message: "Solo se aceptan caracteres no numéricos"
                }
                return ctx
            }
            const cities = citiesRepository.searchCitiesByCountryName(ctx.params.country)
            if (cities.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    message: "No se encontraron ciudades para el país ingresado"
                }
                return ctx
            } else {
                ctx.body = cities
                return ctx
            }
        } catch (e) {
            ctx.status = 500;
            ctx.body =
                {
                    status: 500,
                    message: "Hubo un problema en cargar"
                }
        }
        return ctx
    } else {
        ctx.status = 400;
        ctx.body = {
            message: "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        return ctx
    }
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    if ((ctx.params.country).length >= 3 && (ctx.params.city).length >= 3) {
        try {
            if (/\d/.test(ctx.params.country) || /\d/.test(ctx.params.city)) {
                ctx.status = 400;
                ctx.body = {
                    message: "Solo se aceptan caracteres no numéricos"
                }
                return ctx
            }
            const city = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
            if (city.length === 0) {
                ctx.status = 200;
                ctx.body = {
                    message: "No se encontraron ciudades para el país ingresado"
                }
                return ctx
            } else {
                ctx.body = city
                return ctx
            }
        } catch (e) {
            ctx.status = 500;
            ctx.body =
                {
                    status: 500,
                    message: "Hubo un problema en cargar"
                }
        }
        return ctx
    } else {
        ctx.status = 400;
        ctx.body = {
            message: "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        return ctx
    }
}
