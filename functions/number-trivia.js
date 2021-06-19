const fetch = require('node-fetch');
const { query } = require('./utils/hasura');

const getNumberTrivia = (num) => {
  const api = `http://numbersapi.com/${num}/trivia?json`;
  return fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const { text } = data;

      return {
        trivia: text,
        count: num,
      };
    });
};

exports.handler = async () => {
  const { team_members: teamMembers } = await query({
    query: `
      query {
        team_members{
          member_name
        }
      }
    `,
  });

  const numberFact = await getNumberTrivia(teamMembers.length);

  return {
    statusCode: 200,
    body: JSON.stringify(numberFact),
  };
};
