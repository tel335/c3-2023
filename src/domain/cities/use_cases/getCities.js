import citiesRepository from '../repository/worldCitiesRespository'

function hasNumber(myString) {
    return /\d/.test(myString);
  }


exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    ctx.status = 200;
    if(citiesRepository.searchCitiesByCountryName(ctx.params.country).length === 0){
        ctx.body = { "message": "No se encontraron ciudades para el país ingresado" }
    } else{
    ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country);
    if(ctx.params.country.length < 3){
        ctx.status = 400;
    }
    if(hasNumber(ctx.params.country)){
        ctx.status = 400
    }
    return ctx
    }
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    result = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    ctx.status = 200;
    if( result.length == 0){
        ctx.body = {
            "message": "No se encontraron ciudades para el país ingresado"
        }
    }
    if(ctx.params.country.length < 3 || ctx.params.name.length < 3){
        ctx.status = 400;
    }
    if(hasNumber(ctx.params.country) || hasNumber(ctx.params.name)){
        ctx.status = 400
    }
    ctx.body = result;
    return ctx
}