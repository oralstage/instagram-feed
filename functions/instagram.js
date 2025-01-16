const fetch = require('node-fetch');  // importからrequireに変更

exports.handler = async function(event, context) {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/17841469568309282?fields=name,media.limit(12){caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type}&access_token=${process.env.INSTAGRAM_TOKEN}`
    );
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
};