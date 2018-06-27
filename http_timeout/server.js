const http = require('http');
const util = require('util');
const url = require('url');
const qs = require('querystring');


const server = http.createServer(function(req, res) {
    const urlObj = url.parse(req.url);
    const query = qs.parse(urlObj.query);
    const id = query.id;

    util.log("Received a request:", id);

    req.on('aborted', () => {
	req.aborted = true;
        util.log(id, 'is aborted');
    });

    // res.statusCode = 200;
    // res.setHeader('transfer-encoding', 'chunked');
    // 两种方式是等价的
    res.writeHeader(200, {
        'transfer-encoding': 'chunked'
    });

    let p = Promise.resolve();
    let wait = 0;

    for (const msg of [`${id}: 111`, `${id}: 222`, `${id}: 333`, `${id}: 444`]) {
	p = p.then(() => new Promise((resolve, rej) => {
	    if (!req.aborted) {
	        wait += 2;
	        util.log(id, 'wait', wait, 'seconds ...');
	    setTimeout(() => {
		if (!req.aborted) {
	            res.write(msg + '\n');
		}
		resolve();
            }, wait * 1000);
	    } else {
		resolve();
            }
	}));
    }

    p.then(() => {
	if (!req.aborted) {
            res.end();
            util.log(id + ' end ...');
	}
    });

});

// http timeout 默认是 2 分钟
// server.setTimeout(10 * 1000);

server.listen(3001, function() {
    util.log("server listening at port 3001......");
});

