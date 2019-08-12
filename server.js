const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

require('./public')(app, {});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// app.get('/express_backend', (req, res) => {
// 	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
