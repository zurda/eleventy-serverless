const { query } = require('./utils/hasura');

exports.handler = async (event, context) => {
    const { member_name, team_name } = JSON.parse(event.body);
    const { user } = context.clientContext;
    const isLoggedIn = user && user.app_metadata && user.app_metadata.roles;
    const roles = isLoggedIn ? user.app_metadata.roles : [];

    if (!isLoggedIn || !roles.includes('admin')) {
        return {
        statusCode: 401,
        body: 'Unauthorized',
        };
    }

    const result = await query({
        query: `
            mutation CreateTeamMember ($member_name: String!, $team_name: String!) {
                insert_team_members_one(object: {member_name: $member_name, team_name: $team_name}) {
                    member_name
                    team_name
                }
            }
        `,
        variables: { member_name, team_name },
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};