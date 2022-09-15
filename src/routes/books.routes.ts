import { Router } from "express";
import BooksControllers from "../controllers/booksController";
import { Authenticate } from "../middlewares/authenticate";

const router = Router();

router.post('/', Authenticate, BooksControllers.Register)

router.get('/', BooksControllers.GetAll)

router.get('/book/:id', BooksControllers.GetById)

router.get('/search/:title', BooksControllers.GetByTitle)

router.put('/book/:id', Authenticate, BooksControllers.Update)

router.delete('/book/:id', Authenticate, BooksControllers.Delete);

export default router;