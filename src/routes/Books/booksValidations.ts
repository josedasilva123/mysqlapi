import { body, param } from "express-validator";

export const bookCreateValidation = () => {
  return [
    body("title")
      .isString()
      .withMessage(
        "O título (title) é obrigatório e precisa ser do tipo string"
      ),

    body("pageqty")
      .isInt()
      .withMessage(
        "O título (title) é obrigatório e precisa ser do tipo inteiro"
      ),
  ];
};

export const bookGetByIdValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("O id é obrigatório e precisa ser do tipo string"),
  ];
};

export const bookGetByTitleValidation = () => {
  return [
    param("title")
      .isString()
      .withMessage(
        "O título (title) é obrigatório e precisa ser do tipo string"
      ),
  ];
};

export const bookUpdateValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("O id é obrigatório e precisa ser do tipo string"),

    body("title")
      .isString()
      .withMessage(
        "O título (title) é obrigatório e precisa ser do tipo string"
      ),

    body("pageqty")
      .isInt()
      .withMessage(
        "O título (title) é obrigatório e precisa ser do tipo inteiro"
      ),
  ];
};

export const bookDeleteValidation = () => {
  return [
    param("id")
      .isString()
      .withMessage("O id é obrigatório e precisa ser do tipo string"),
  ];
};
