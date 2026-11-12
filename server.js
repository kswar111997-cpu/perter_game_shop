// PETER GAME SHOP backend starter (Node.js 18+)
// Keeps supplier API credentials on the server, never in browser JavaScript.
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const API_URL = process.env.SUPPLIER_LOOKUP_URL;
const API_KEY = process.env.SUPPLIER_API_KEY;

const server = http.createServer(async (req, res) => {
  const headers = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json; charset=utf-8'};
  if (req.method === 'OPTIONS') { res.writeHead(204, headers); return res.end(); }
  if (req.method === 'POST' && req.url === '/api/lookup') {
    let raw=''; req.on('data', c => raw += c);
    req.on('end', async () => {
      try {
        const {playerId, serverId} = JSON.parse(raw || '{}');
        if (!/^\\d+$/.test(String(playerId||'')) || !/^\\d+$/.test(String(serverId||''))) throw new Error('Invalid Player ID or Server ID');
        if (!API_URL || !API_KEY) throw new Error('Supplier lookup API is not configured yet');
        // IMPORTANT: adapt payload and response mapping to your supplier's official API documentation.
        const upstream = await fetch(API_URL, {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':`Bearer ${API_KEY}`},
          body:JSON.stringify({userId:String(playerId), zoneId:String(serverId)})
        });
        const data = await upstream.json();
        if (!upstream.ok) throw new Error(data.message || 'Supplier API request failed');
        const nickname = data.nickname || data.name || data.data?.nickname || data.data?.name;
        if (!nickname) throw new Error('No nickname field found; adjust response mapping to supplier docs');
        res.writeHead(200, headers); res.end(JSON.stringify({nickname}));
      } catch (e) { res.writeHead(400, headers); res.end(JSON.stringify({error:e.message})); }
    });
    return;
  }
  if (req.method === 'GET' || req.method === 'HEAD') {
    const file = path.join(__dirname, 'index.html');
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res); return;
  }
  res.writeHead(404, headers); res.end(JSON.stringify({error:'Not found'}));
});
server.listen(PORT, () => console.log(`PETER GAME SHOP running on port ${PORT}`));
