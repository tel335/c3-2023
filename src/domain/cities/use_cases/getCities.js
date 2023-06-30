import citiesRepository from '../repository/worldCitiesRespository'

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository()
    return ctx
}

exports.getCitiesByCountryUseCase = (ctx) => {
    
    var input = ctx.params.country
    var words = input.split(' ');
    

    // Iterate through the array and capitalize the first letter of each word
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        word=word.toLowerCase()
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Join the modified array back into a string
    var capitalizedStr = words.join(' ');

    
    
    ctx.body = citiesRepository.searchCitiesByCountryName(capitalizedStr)
    if (ctx.body.length == 0) {
        ctx.body = {"message": "No se encontraron ciudades para el país ingresado"}
    }

    var regex = /\d/; // Regular expression to match any digit
    if(regex.test(capitalizedStr)){
        ctx.body ={"message": "Solo se aceptan caracteres no numéricos"}
        ctx.status = 400
    }
    
    if(ctx.params.country.length < 3){
        ctx.body ={"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"}
        ctx.status = 400
    }
    return ctx
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    var input_country = ctx.params.country
    var input_city = ctx.params.city

    var words_country = input_country.split(' ');
    var words_city = input_city.split(' ');

    // Iterate through the array and capitalize the first letter of each word
    for (var i = 0; i < words_country.length; i++) {
        var word = words_country[i];
        word=word.toLowerCase()
        words_country[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    for (var i = 0; i < words_city.length; i++) {
        var word = words_city[i];
        word=word.toLowerCase()
        words_city[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Join the modified array back into a string
    var capitalized_country = words_country.join(' ');
    var capitalized_city = words_city.join(' ');
    

    // ctx.body = citiesRepository.searchCityByCityNameAndCountry(ctx.params.city, ctx.params.country)
    ctx.body = citiesRepository.searchCityByCityNameAndCountry(capitalized_city, capitalized_country)
    if (ctx.body.length == 0) {
        ctx.body = {"message": "No se encontraron ciudades para el país ingresado"}
    }

    var regex = /\d/; // Regular expression to match any digit
    if(regex.test(capitalized_country) || regex.test(capitalized_city)){
        ctx.body ={"message": "Solo se aceptan caracteres no numéricos"}
        ctx.status = 400
    }

    if(capitalized_city.length < 3 || capitalized_country.length < 3){
        ctx.body ={"message": "El país/ciudad ingresado debe tener al menos 3 caracteres"}
        ctx.status = 400
    }

    return ctx
}