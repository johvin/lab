# http request timeout

socket connection 默认不设置超时时间，但是 http server 明确了 timeout 时间，timeout 时间内无数据返回出触发 timeout event，在没有对应 handler 的情况下，connection 会被断开，出现 ECONNRESET（即socket hang up 的错误）。

这里需要说明的是，只有在 res.write 未被调用的情况下 timeout 才会触发 ECONNRESET，否则只会关闭（相当于 res.end()）connection。(具体见 server.js)

socket timeout 的时候会调用 socketOnTimeout (内部监听器），其内部的逻辑是判断 req & res & server 的 timeout 是否存在，如果任意存在，则交给对应 handler 来处理，connection 不断开；否则直接 destroy connection

http server nodejs 源码：
https://github.com/nodejs/node/blob/8ce20aff2dbee80ca2739f37c36999e3906f5f06/lib/_http_server.js#L338

## 自定义 timeout

如下几种 api 支持设置 timeout:
- http.Server.setTimeout
- http.ClientRequest.setTimeout
- http.IncomingMessage.setTimeout
- http.ServerResponse.setTimeout

## references
https://www.cnblogs.com/lienhua34/p/6057662.html
