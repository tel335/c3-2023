import citiesRepository from '../repository/worldCitiesRespository'
import {body} from "koa/lib/response";

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const alphanumericRegex = /^[A-Za-z]+$/;
    const inputCountryName = ctx.params.country;

    if (!alphanumericRegex.test(inputCountryName)) {
        ctx.status = 400;
        ctx.body = {
            message: 'Solo se aceptan caracteres no numéricos'
        };
    }else if (inputCountryName.length < 3 ) {
        ctx.status = 400;
        ctx.body = {
            message: 'El país/ciudad ingresado debe tener al menos 3 caracteres'
        };
    }else{
        ctx.body = citiesRepository.searchCitiesByCountryName(ctx.params.country.toLowerCase())
    }

    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    const inputCityName = ctx.params.city;
    const inputCountryName = ctx.params.country;

    const isNumericCity = /^\d+$/.test(inputCityName); // Verificar si el nombre de la ciudad es numérico
    const isNumericCountry = /^\d+$/.test(inputCountryName);
    if (isNumericCity || isNumericCountry) {
        ctx.status = 400;
        ctx.body = {
            message: 'Solo se aceptan caracteres no numéricos'
        };
    }else if (inputCityName.length < 3 || inputCountryName.length < 3) {
        ctx.status = 400;
        ctx.body = {
            message: 'El país/ciudad ingresado debe tener al menos 3 caracteres'
        };
    }  else {
        ctx.body = citiesRepository.searchCityByCityNameAndCountry(inputCityName.toLowerCase(), inputCountryName.toLowerCase());
    }
    return ctx
}