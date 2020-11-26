const teamMembers = require('../data/team-members.json');

exports.handler = async (event) => {
  const { name } = event.queryStringParameters;
  const selectedTeam = teamMembers.filter((member) => member.team_name.toLowerCase() === name.toLowerCase());
  membersArray = selectedTeam.map(member => member.name);
  
  if (!selectedTeam) {
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
