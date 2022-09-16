import { Router } from "express";
import BooksControllers from "./booksController";
import { Authenticate } from "../../middlewares/authenticate";
import { Validate } from "../../middlewares/handleValidation";
import { bookCreateValidation, bookDeleteValidation, bookGetByIdValidation, bookGetByTitleValidation, bookUpdateValidation } from "./booksValidations";

const router = Router();

router.post('/', bookCreateValidation(), Validate, Authenticate, BooksControllers.Create)

router.get('/', BooksControllers.GetAll)

router.get('/book/:id', bookGetByIdValidation(), Validate, BooksControllers.GetById)

router.get('/search/:title', bookGetByTitleValidation(), Validate, BooksControllers.GetByTitle)

router.put('/book/:id', bookUpdateValidation(), Validate, Authenticate, BooksControllers.Update)

router.delete('/book/:id', bookDeleteValidation(), Validate, Authenticate, BooksControllers.Delete);

export default router;