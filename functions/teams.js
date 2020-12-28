const { query } = require('./utils/hasura');

exports.handler = async (_) => {
    const { fed_teams: fedTeams } = await query({
    query: `
        query {
            fed_teams{
                team_name
            }
        }
    `,
    });
    
    if (!fedTeams.length) {
        return {
            statusCode: 404,
            body: 'Not Found',
        };
    }

    const teams = fedTeams.map(team => team.team_name)

    return {
        statusCode: 200,
        body: JSON.stringify(teams),
    };
};
