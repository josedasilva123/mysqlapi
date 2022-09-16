import { body } from "express-validator";

export const userRegisterValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome (name) é obrigatório e precisa ser do tipo string"),

    body("email")
      .isString()
      .withMessage("O nome (email) é obrigatório e precisa ser do tipo string")
      .isEmail()
      .withMessage("O campo precisa receber obrigatoriamente um e-mail"),

    body("password")
      .isString()
      .withMessage(
        "A senha (password) é obrigatória e precisa ser do tipo string"
      ),
  ];
};

export const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O nome (email) é obrigatório e precisa ser do tipo string"),

    body("password")
      .isString()
      .withMessage(
        "A senha (password) é obrigatória e precisa ser do tipo string"
      ),
  ];
};
