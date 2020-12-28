const fetch = require('node-fetch');
const { query } = require('./utils/hasura');

exports.handler = async () => {
  const { pokemons_assets: pokemons, team_members: teamMembers } = await query({
    query: `
      query {
        pokemons_assets {
          pokemon_name
          gif
          image
        }
          team_members{
            team_name
            member_name
            github_user
          }
      }
    `,
  });


  const promises = pokemons.map((pokemon) => {
    const membersObj = teamMembers.filter((member) => member.team_name.toLowerCase() === pokemon.pokemon_name.toLowerCase());
    // remove unnecessary field: team_name
    const membersFields = membersObj.map(({member_name, github_user}) => ({member_name, github_user}));
    const api = `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_name}`;
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
          team_members: membersFields
        };
      });
  });

  const pokemonsWithApiData = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(pokemonsWithApiData),
  };
};
