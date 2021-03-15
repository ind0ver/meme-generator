const express = require("express");
const path = require('path');
const memes = require('./stealMemes')

const PORT = process.env.PORT || 3000;
const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../../build')));

app.get(`/api/:id`, (req, res) => {
    memes(req.params.id).then(gotMemes => res.json(gotMemes));
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

