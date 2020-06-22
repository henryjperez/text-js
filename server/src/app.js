const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');

const userRoute = require('./routes/user-route');
const channelRoute = require('./routes/channel-route');
const messageRoute = require('./routes/message-route');

const imgStorage = multer.diskStorage({
	destination: path.join(__dirname, './upload/temp'),
	filename(req, file, callback) {
		callback(null, new Date().getTime() + path.extname(file.originalname));
	}
});

//setting the "port" variable to respond to the "dot.environment"
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(multer(imgStorage).single('image'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/users', userRoute);
app.use('/api/channels', channelRoute);
app.use('/api/messages', messageRoute);

//error handling
app.use((error, req, res, next) => {
	console.log("Error handling ==>" + error + "<=== Error handling"); //DEV-Error handling
	const statusCode = error.statusCode || 500;
	const { name, message } = error;

	res.status(statusCode).json({ server_message: name + " => " + message });

});


module.exports = app;
