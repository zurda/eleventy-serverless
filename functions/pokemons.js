const pokemons = require('../data/pokemons.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(pokemons),
  };
};
