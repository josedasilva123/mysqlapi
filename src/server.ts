import express from "express";
import { User } from "./models/User";
import { Books } from "./models/Books";
import BookRoutes from "./routes/books.routes";
import UserRoutes from "./routes/user.routes";

export const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//app.use("/books", BookRoutes);
//app.use("/user", UserRoutes);



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