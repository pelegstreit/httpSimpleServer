import log from '@ajar/marker'; 
import http from 'http';
import { url } from 'inspector';

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;
//console.log(process.env);

//create an http web server
const server = http.createServer( (req,res)=> {
    res.statusCode = 200;
    // res.setHeader('Content-Type','text/plain')
    // res.setHeader('Content-Type','text/html')
    // res.end(`<h1>Hello from server!!!</h1>`);
    const link = 'http://localhost:3030/users/lister?month=April&temp=32'
    const myURL = new URL(link);
    res.setHeader('agenda', `political`)
    res.setHeader('anything', `goes`)
    res.setHeader('Content-Type','application/json')
    res.setHeader('some-single-header', `some-single-value`)
    let obj = {href:myURL.href,
    url:link.replace(myURL.origin, ""),
    method: req.method,
    host:myURL.host,  
    protocol: myURL.protocol,
    httpVersion: req.httpVersion,
    pathName:myURL.pathname,
        querystring:{
            month:myURL.searchParams.get(`month`),
            temp: myURL.searchParams.get(`temp`)
        },
        useragent:req.headers[`user-agent`],
        connection: req.headers.connection
    }
    res.end(JSON.stringify(obj));
    // res.end(obj);
    log.magenta(req.method,req.url);
});


//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) log.error(err);
    else log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
