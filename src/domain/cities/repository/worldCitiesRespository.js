import worldCitiesDataset from '../../../../dataset/world-cities_json.json'

exports.getAllCitiesRepository = () => {
    return worldCitiesDataset
}

exports.searchCitiesByCountryName = (inputCountryName) => {
    const result = [];
    
    for (let i = 0; i < inputCountryName.length; i++) {
        if (!isNaN(parseInt(inputCountryName[i]))) {
          return {
            status: 400,
            body: {
              message: 'Solo se aceptan caracteres no numéricos'
            }
          };
        }
      }
  
    worldCitiesDataset.forEach((cityObject) => {
      if (inputCountryName.toLowerCase() === cityObject.country.toLowerCase()) {
        result.push(cityObject);
      }
    });
  
    if (result.length === 0) {
      return {
        status: 200,
        body: {
          message: 'No se encontraron ciudades para el país ingresado'
        }
      };
    }
  
    return result;
  };
  

exports.searchCityByCityNameAndCountry = (inputCityName, inputCountryName) => {
    const result = []
    worldCitiesDataset.forEach((cityObject) => {
        if(inputCityName === cityObject.name && inputCountryName === cityObject.country) result.push(cityObject)
    })
    return result
}