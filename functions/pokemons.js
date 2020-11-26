const fetch = require('node-fetch');
const pokemons = require('../data/pokemons.json');
const teamMembers = require('../data/team-members.json');

exports.handler = async () => {
  const promises = pokemons.map((pokemon) => {
    const membersObj = teamMembers.filter((member) => member.team_name.toLowerCase() === pokemon.name.toLowerCase());
    const team_members = membersObj.map(member => member.name);
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
          team_members
        };
      });
  });

  const pokemonsWithApiData = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(pokemonsWithApiData),
  };
};
