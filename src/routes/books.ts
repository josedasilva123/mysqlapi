import { Router } from "express";
import BooksControllers from "../controllers/booksController";

const router = Router();

router.post('/', BooksControllers.Register)

router.get('/', BooksControllers.GetAll)

router.get('/book/:id', BooksControllers.GetById)

router.get('/search/:title', BooksControllers.GetByTitle)

router.put('/book/:id', BooksControllers.Update)

router.delete('/book/:id', BooksControllers.Delete);

export default router;