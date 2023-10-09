import { Router } from "express";
import { genreValidation } from "../models/validations/genre.schema.js";
import { validateSchema } from "../models/validations/validator.js";
import { destroyBook, indexBook, showBook, storeBook, updateBook } from "../controllers/books.controller.js";
import { bookValidation } from "../models/validations/books.schema.js";


const router = Router();


router.get('/books', indexBook);
router.post('/books', bookValidation, validateSchema, storeBook);
router.get('/books/:bookId', showBook)
router.put('/books/:bookId/update', bookValidation, validateSchema, updateBook)
router.delete('/books/:bookId/destroy', destroyBook)



export default router;
