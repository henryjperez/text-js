require('dotenv').config();
require('./database-connection');
const http = require('http');

const app = require('./app');
const socketCallBack = require('./socket');

const server = http.createServer(app);


async function main() {
	await server.listen(app.get('port'), () => {
		console.log('Server in port ' + app.get('port')); });

	const io = require('./io').init(server);
		io.on('connection', socketCallBack);

}

main();