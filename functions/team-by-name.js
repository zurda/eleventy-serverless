const { query } = require('./utils/hasura');

exports.handler = async (event) => {
  const { name } = event.queryStringParameters;
  const { team_members: teamMembers } = await query({
    query: `
      query {
        team_members{
          team_name
          member_name
        }
      }
    `,
  });
  const selectedTeam = teamMembers.filter((member) => member.team_name.toLowerCase() === name.toLowerCase());
  membersArray = selectedTeam.map(member => member.member_name);
  
  if (!selectedTeam.length) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(membersArray),
  };
};
