const fetch = require('node-fetch');
const pokemons = require('../data/pokemons.json');

exports.handler = async () => {
  const promises = pokemons.map((pokemon) => {
    const api = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const { weight, height, abilities } = data;

        return {
          ...pokemon,
          weight,
          height,
          abilities,
        };
      });
  });

  const pokemonsWithApiData = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(pokemonsWithApiData),
  };
};
