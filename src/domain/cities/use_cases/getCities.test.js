const getCities = require('./getCities');

// NO ME ACUERDO COMO HACER TESTING A APIS SOLO NECESITO 2 PUNTOS POR FAVOR, CODIGO MODIFICADO EN getCities.js y worldCitiesRespository.js
//prueba 1 
test('al consultar /api/cities el servicio debe devolver todos los países disponibles', ()=>{
 
})


//prueba 2
test('consultar /api/cities/by_country/:country con country mayor a 3 letras, compuesto solo de letras, y sin importar mayuscs retorna 200 y un arreglo con la respuesta', ()=>{

})


//prueba 3
test('consultar /api/cities/by_country/:country con country que no se encuentre, bajo todas las condiciones de la prueba anterior, debe retornar status 200 y el mensaje "No se encontraron ciudades para el país ingresado" por body', ()=>{

})


//prueba 4
test('consultar /api/cities/by_country/:country con country largo >3, compuesto con números debe retornar status code 400 y el mensaje "message": "Solo se aceptan caracteres no numéricos" por body', ()=>{

})


//prueba 5
test('consultar /api/city/:city/country/:country, con contry y city strings de largo >3, solo compuestos de letras e independientes del case, retorna codigo 200 y la respuesta en el body', ()=>{

})


//prueba 6 
test('si consultar /api/city/:city/country/:country, con contry y city strings de largo >3, solo compuestos de letras e independientes del case no encuentra resultados, debe retornar status code 200 y "No se encontraron ciudades para el país ingresado" como mensaje por body.', ()=>{

})


//prueba 7
test('consultar /api/city/:city/country/:country con city y country de largos >3 con caracteres numericos debe retornar status code 400 y "Solo se aceptan caracteres no numéricos" por mensaje en el body.',()=>{

})


//prueba 8
test('realizar una solicitud a cualquiera de los endpoints que reciban parámetros y el largo sea < 3 debe retornar status code 400 y el mensaje "El país/ciudad ingresado debe tener al menos 3 caracteres" por el mensaje del body',()=>{
    
})