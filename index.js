const express = require("express");

const app = express();

const port = 3000;

const BookRoutes = require("./routes/books");
const UserRoutes = require("./routes/user");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/books", BookRoutes);
app.use("/user", UserRoutes);

app.listen(port, () => {
  console.log("API inciada na porta: " + port);
});

/*
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
*/