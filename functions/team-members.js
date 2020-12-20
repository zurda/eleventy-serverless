const { query } = require('./utils/hasura');

exports.handler = async (event) => {
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
    
    if (!teamMembers.length) {
    return {
        statusCode: 404,
        body: 'Not Found',
    };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(teamMembers),
    };
};
