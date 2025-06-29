const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());

app.get('/tenants', (req, res) => {
	fs.readFile('./tenants.json', 'utf8', (err, data) => {
		if (err) return res.status(500).json({ error: 'Cannot read tenants.json' });
		res.json(JSON.parse(data));
	});
});

app.listen(PORT, () => {
	console.log(`Tenant config server running on port ${PORT}`);
});
