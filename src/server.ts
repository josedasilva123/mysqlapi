import express from "express";
import BookRoutes from "./routes/Books/books.routes";
import UserRoutes from "./routes/User/user.routes";

export const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/books", BookRoutes);
app.use("/user", UserRoutes);
