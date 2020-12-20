const { query } = require('./utils/hasura');

exports.handler = async (event, context) => {
    const { member_name, team_name } = JSON.parse(event.body);

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