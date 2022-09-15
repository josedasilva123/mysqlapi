import request from "supertest";
import { app } from "../server";

describe("Rota de registro POST", () => {
  test("Verificando erro do body", async () => {
    await request(app)
      .post("/user/register")
      .send({
        name: "Alex Conder",
        email: "alex.v.conder@gmail.com",
      })
      .expect(400, { error: "Está faltando um parâmetro no body" });
  });
});

describe("Rota de registro POST", () => {
  test("Tentativa de cadastrar usuário existente", async () => {
    await request(app)
      .post("/user/register")
      .send({
        name: "Alex Conder",
        email: "email@email.com.br",
        password: "@Batatinha123",
      })
      .expect(400, {
        error: "O e-mail fornecido já está associado a um usuário cadastrado",
      });
  });
});

describe("Rota de login POST", () => {
  test("Usuário não encontrado", async () => {
    await request(app)
      .post("/user/login")
      .send({
        email: "email@email.com.br3",
        password: "@20Fungos",
      })
      .expect(400, {
        error: "Usuário não encontrado.",
      });
  });
});

describe("Rota de login POST", () => {
  test("Senha incorreta", async () => {
    await request(app)
      .post("/user/login")
      .send({
        email: "email@email.com.br",
        password: "@20Fungos3211",
      })
      .expect(400, {
        error: "Sua senha está incorreta.",
      });
  });
});