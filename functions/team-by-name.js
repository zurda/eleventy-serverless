const pokemons = require('../data/pokemons.json');

exports.handler = async (event) => {
  const { name } = event.queryStringParameters;
  const team = pokemons.find((team) => team.name.toLowerCase() === name.toLowerCase());

  if (!team) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(team),
  };
};
