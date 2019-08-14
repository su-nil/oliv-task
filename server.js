const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

require('./public')(app, {});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// redirect all to index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
