const { query } = require('./utils/hasura');

exports.handler = async (_) => {
    const { team_members: teamMembers } = await query({
    query: `
        query {
            team_members{
                team_name
            }
        }
    `,
    });
    
    if (!teamMembers.length) {
        return {
            statusCode: 404,
            body: 'Not Found',
        };
    }

    const teams = [];
    teamMembers.forEach(team => {
        if (teams.indexOf(team.team_name) === -1) {
            teams.push(team.team_name) 
        }
    })

    return {
        statusCode: 200,
        body: JSON.stringify(teams),
    };
};
