import sequelize from "./database/pool";
import { app } from "./server";

const port = 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("API inciada na porta: " + port);
  });  
}).catch((err) => {
  console.log(err);
})
