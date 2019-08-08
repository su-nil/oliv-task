const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(cors());

require('./public')(app, {});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
