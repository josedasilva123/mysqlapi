import request from "supertest";
import { app } from "../../server";

describe("Rota de registro POST", () => {
  test("Tentativa de cadastrar com body faltando atributo.", async () => {
    await request(app)
      .post("/books")
      .send({
        title: "Harry Potter",
      })
      .expect(422, {
        errors: [
          {
            pageqty:
              "O título (title) é obrigatório e precisa ser do tipo inteiro",
          },
        ],
      });
  });
});

describe("Rota de registro POST", () => {
  test("Tentativa de cadastrar sem autorização.", async () => {
    await request(app)
      .post("/books")
      .send({
        title: "Harry Potter",
        pageqty: 123,
      })
      .expect(400, {
        error: "Está rota precisa de autorização.",
      });
  });
});
