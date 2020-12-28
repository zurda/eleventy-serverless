const { query } = require('./utils/hasura');

exports.handler = async (_) => {
    const { fed_teams: fedTeams } = await query({
    query: `
        query {
            fed_teams{
                team_name
                oe_specialty
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

    return {
        statusCode: 200,
        body: JSON.stringify(fedTeams),
    };
};
