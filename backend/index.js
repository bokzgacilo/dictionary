const express = require("express");
const mysql = require("mysql");
const config = require("./config");
// const merriam = require("./merriam.config");
const axios = require("axios");
const app = express();
const port = 3080;
var cors = require('cors');

app.use(express.json());

var conn = mysql.createConnection(config.db)

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors())

// SEARCH WORD
app.get("/search/:id", (req, res) => {
  var word = req.params.id;
  axios({
    method: 'get',
    url: `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=fb3021aa-0505-4b43-bd2c-b89bec3ec5e7`,
  }).then(function (response) {
    res.json(response.data)
  });
})

// SEARCH WORD
app.get("/word/:id", (req, res) => {
  var word = req.params.id;
  axios({
    method: 'get',
    url: `https://www.dictionaryapi.com/api/v3/references/medical/json/${word}?key=fb3021aa-0505-4b43-bd2c-b89bec3ec5e7`,
  }).then(function (response) {
    res.json(response.data)
  });
})

// SELECT ALL
app.get("/selectAll", (req, res) => {
  conn.query("SELECT * FROM users", (err, result) => {
    res.json(result)
  })
})

// SELECT Single
app.get("/select/:id", (req, res) => {
  var id = req.params.id;
  conn.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    res.json(result)
  })
})

// INSERT
app.post("/insertUser", (req, res) => {
  const {name, email} = req.body;
  const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
  conn.query(sql, [name, email], (err, result) => {
    res.send(`User ${name} inserted into the database`);
  });
})

// DELETE
app.delete("/delete/:id", (req, res) => {
  var id = req.params.id;
  conn.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
    res.send(`User ID: ${id} was deleted`)
  })
})

// UPDATE
app.put("/update/:id", (req, res) => {
  var id = req.params.id;
  var {name, email} = req.body;
  const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  conn.query(sql, [name, email, id], (err, result) => {
    res.send(`User ${id} was updated.`);
  });
})

// ROOT
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});