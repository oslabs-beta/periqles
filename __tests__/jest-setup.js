const {Response, Request, Headers, fetch} = require('whatwg-fetch');
;

module.exports = async () => {
  global.testServer = await require('./server/server.js');
  global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch
  
};
