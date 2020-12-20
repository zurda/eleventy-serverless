const fetch = require('node-fetch');
const { query } = require('./utils/hasura');
const teamMembers = require('../data/team-members.json');

exports.handler = async () => {
  const { pokemons } = await query({
    query: `
      query {
        pokemons {
          name
          gif
          image
        }
      }
    `,
  });


  const promises = pokemons.map((pokemon) => {
    const membersObj = teamMembers.filter((member) => member.team_name.toLowerCase() === pokemon.name.toLowerCase());
    const team_members = membersObj.map(member => member.name);
    const api = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const { weight, height, abilities, id } = data;

        return {
          ...pokemon,
          id,
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
