import express from "express";
import BookRoutes from "./routes/books";
import UserRoutes from "./routes/user";

const app = express();

const port = 3000;

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