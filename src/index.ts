import { app } from "./server";

const port = 3000;

app.listen(port, () => {
    console.log("API inciada na porta: " + port);
  });