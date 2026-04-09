const TANK_KEY = '58e52abdc5msh7f35aacad24a019p155866jsn687ec1507cf2';
const TANK_HOST = 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const params = event.queryStringParameters || {};
  const endpoint = params.endpoint || 'getNFLScoresOnly';
  delete params.endpoint;

  const query = new URLSearchParams(params).toString();
  const url = `https://${TANK_HOST}/${endpoint}${query ? '?' + query : ''}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': TANK_KEY,
        'X-RapidAPI-Host': TANK_HOST
      }
    });
    const data = await res.json();
    return { statusCode: res.status, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
