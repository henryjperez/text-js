const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI? process.env.MONGODB_URI: 'mongodb://localhost/textjs';

mongoose
.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true

})
.then(() => console.log('Database connection on => ' + URI))
.catch(error => console.log('ERROR => ' + error));

mongoose.connection.once('open', () => {
	console.log('DB is on the House');

});
