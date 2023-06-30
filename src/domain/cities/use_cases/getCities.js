import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    if (ctx.params.country.length < 3){
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        ctx.status = 400
        //ctx.throw(400, 'Not Found: The user was not found')
        return ctx
    }
    else{

        if(containsNumbers(ctx.params.country)){
            ctx.body = {
                "message": "Solo se aceptan caracteres no numéricos"
            }
            ctx.status = 400
            return ctx
        }
        else{
            const formatInput = formatString(ctx.params.country) // aqui

            const searchResult = citiesRepository.searchCitiesByCountryName(formatInput)
            if(searchResult.length > 0){
                ctx.body = searchResult
                ctx.status = 200
                return ctx
            }
            else{
                ctx.body = {
                    "message": "No se encontraron ciudades para el país ingresado"
                }
                ctx.status = 200
                return ctx
            }
        }

    }
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {

    if (ctx.params.country.length < 3  || ctx.params.city.length < 3 ){
        ctx.body = {
            "message": "El país/ciudad ingresado debe tener al menos 3 caracteres"
        }
        ctx.status = 400

        return ctx
    }
    else{
        const formatCity = formatString(ctx.params.city)
        const formatCountry = formatString(ctx.params.country)
        ctx.body = citiesRepository.searchCityByCityNameAndCountry(formatCity, formatCountry)
        ctx.status = 200
        return ctx
    }
}

function formatString(str) {
    const words = str.split(/\b/);

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
            break;
        }
    }

    return words.join('');
}

function containsNumbers(str) {
    const regex = /\d/;
    return regex.test(str);
}