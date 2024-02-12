const express = require("express");
const basicAuth = require("./atuhentication_midleware");
const app = express();
const port = 3000;
const axios = require("axios");

//Node.js uygulamasında Express çerçevesi kullanılarak gelen isteklerdeki JSON verilerini işlemek için kullanılır.
app.use(express.json());

let data = [
  { id: 1, name: "Örnek 1" },
  { id: 2, name: "Örnek 2" },
];

app.get("/api/data", basicAuth, (req, res) => {
  res.status(200).json(data);
});

app.get("/api/data/:id", basicAuth, (req, res) => {
  // req.params.id ile id parametresi okunabilir.
  const id = parseInt(req.params.id);
  const item = data.find((d) => d.id === id);

  if (!item) {
    return res.status(404).json({ message: "Böyle bir veri bulunamadı." });
  }

  res.status(200).json(item);
});

app.post("/api/data", basicAuth, (req, res) => {
  // req.body.name ile request 'in body sindeki json nesneye erişilir.
  const newItem = {
    id: data.length + 1,
    name: req.body.name,
  };

  data.push(newItem);
  res.status(201).json(newItem);
});

app.listen(port, () => {
  console.log(`Port: ${port}`);

  var session_url = "http://localhost:3000/api/data";
  var username = "admin";
  var password = "password";
  //axios get örnek
  axios
    .get(session_url, {
      auth: {
        username: username,
        password: password,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error on Authentication Error: " + error);
    });

  //axios post örnek
  axios
    .post(
      session_url,
      { name: "Yeni veri 3" },
      {
        auth: {
          username: username,
          password: password,
        },
      },
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error on Authentication Error: " + error);
    });

  //fetch get örnek
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/api/data", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});
