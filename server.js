const http = require('http');

// const host = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) =>{
    let result = {
        'response': 'Miya atsumus greatest gift wasn\'t his talent or his love for volleyball, it was actually his twin brother Atsumu',
        'status': 'Because i\'m a setter'
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

server.listen(port, host, () => {
    console.log(`server running at http://:${port}/`)
})