const express = require("express");
const basicAuth = require('./atuhentication_midleware');
const app = express();
const port = 3000;
const axios = require('axios');


//Node.js uygulamasında Express çerçevesi kullanılarak gelen isteklerdeki JSON verilerini işlemek için kullanılır.
app.use(express.json());

let data = [
  {id:1, name:"Örnek 1"},
  {id:1, name:"Örnek 1"},
];

app.get('/api/data', basicAuth, (req, res) => {
    res.status(200).json(data);
});

app.listen(port, () =>{ 
  console.log(`Port: ${port}`);
  
  axios.get('http://localhost:3000/api/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
  
});

