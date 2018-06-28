const http = require('http');
const util = require('util')

const reqId = ('' + Math.random()).slice(2, 10);
const opt = {
    host: 'localhost',
    port: 3001,
    method: 'GET',
    path: '/?id=' + reqId
};

const req = http.request(opt, function(res) {
    util.log(reqId, 'response STATUS =>', res.statusCode);

    res.setEncoding('utf8');
    let resultText = '';

    res.on('data', (chunk) => {
        resultText += chunk;
        util.log(reqId, 'response chunk =>', chunk);
    });
    res.on('end', () => {
        util.log(reqId, 'response end');
    });
});

req.on('timeout', function () {
    util.log(reqId, 'timeout ...', req.socket._idleTimeout);
    req.abort();
});

// req.setTimeout(5 * 1000);

req.on('error', (e) => {
    util.log(reqId, 'error', e);
});

util.log("start request:", reqId, '...');
req.end();
