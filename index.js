const express = require("express");

const connection = require("./database/connection");

const app = express();

const port = 3000;

const BookRoutes = require("./routes/books");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/books", BookRoutes);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectou ao MYSQL!");

    app.listen(port, () => {
      console.log("API inciada na porta: " + port);
    });
  }
});
