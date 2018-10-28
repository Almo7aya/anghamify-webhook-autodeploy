const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;

const projectPath = '/home/ali/anghamify-src';
const exeCode = 'git pull && yarn start';

const secret = process.env.ANGFY_SEC || 'go fish';
const port = 3201;

http.createServer((req, res) => {

    if (req.method !== 'POST') return res.end('go fish');

    req.on('data', chunk => { // to get the request body

        const sig = 'sha1=' + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        // if not the same
        if (req.headers['x-hub-signature'] !== sig) return res.end('go fish');

        // start exec the auto deploy code
        exec(`cd ${projectPath} && ${exeCode}`);
        console.log('reloading...');

        res.end('OK');
    });

}).listen(port, () => console.log('Webhook is working fine'));

console.log(secret);