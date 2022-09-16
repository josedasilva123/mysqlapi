import { Router } from "express";
import BooksControllers from "../../controllers/booksController";
import { Authenticate } from "../../middlewares/authenticate";
import { Validate } from "../../middlewares/handleValidation";
import { bookCreateValidation, bookDeleteValidation, bookGetByIdValidation, bookGetByTitleValidation, bookUpdateValidation } from "./booksValidations";

const router = Router();

router.post('/', Validate, bookCreateValidation(), Authenticate, BooksControllers.Create)

router.get('/', BooksControllers.GetAll)

router.get('/book/:id', Validate, bookGetByIdValidation(), BooksControllers.GetById)

router.get('/search/:title', Validate, bookGetByTitleValidation(), BooksControllers.GetByTitle)

router.put('/book/:id', Validate, bookUpdateValidation(), Authenticate, BooksControllers.Update)

router.delete('/book/:id', Validate, bookDeleteValidation(), Authenticate, BooksControllers.Delete);

export default router;