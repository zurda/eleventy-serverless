const { query } = require('./utils/hasura');

exports.handler = async () => {
  const { badges, badges_category: badgesCategory } = await query({
    query: `
      query {
        badges {
          id
          name
          description
          emoji
          category_id
        }
        
        badges_category {
          category_id
          category_name
        }
      }
    `,
  });

  if (!badges.length) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }

  badges.forEach((badge) => {
    // Add  category name
    const category_id = badge.category_id;
    const badge_category_name = badgesCategory.filter(
      (category) => category.category_id === category_id
    )[0].category_name;
    badge.category_name = badge_category_name;
    // remove category id
    delete badge.category_id;
  });

  return {
    statusCode: 200,
    body: JSON.stringify(badges),
  };
};
