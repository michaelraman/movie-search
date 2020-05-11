const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 4000;
const axios = require('axios');

app.use(express.static(publicPath));

// The OMDb API is called from the server to avoid exposing the API key
app.get('/getMovies/:searchTerm', function(req, res) {
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${req.params.searchTerm}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        res.status(error.response.status);
        res.send(error.message);
      } else {
        if (error.request) {
          console.log(error.request);
        } else {
          console.log(error.message);
        }

        res.status(500);
        res.send(error.message);
      }
    });
});

app.get('/', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
   console.log('Server started');
});
