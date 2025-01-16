const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // 環境変数の確認
    console.log('Instagram Token:', process.env.INSTAGRAM_TOKEN ? 'Token exists' : 'No token');

    // トークンのバリデーション
    if (!process.env.INSTAGRAM_TOKEN) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Instagram token is missing' })
      };
    }

    // APIエンドポイントの修正
    const url = `https://graph.facebook.com/v21.0/17841469568309282/media?fields=id,caption,media_url,thumbnail_url,permalink,like_count,comments_count,media_type&access_token=${process.env.INSTAGRAM_TOKEN}`;

    const response = await fetch(url);
    
    // レスポンスのステータスコードを確認
    console.log('API Response Status:', response.status);

    const data = await response.json();
    
    // データの詳細をログ出力
    console.log('API Response Data:', JSON.stringify(data));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    // エラーの詳細をログ出力
    console.error('Full Error:', err);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed fetching data', 
        details: err.toString(),
        stack: err.stack 
      })
    };
  }
};