import { Router } from "express";
import { destroyAuthor, indexAuthor, showAuthor, storeAuthor, updateAuthor } from "../controllers/author.controller.js";
import { authorValidation } from "../models/validations/author.schema.js";
import { validateSchema } from "../models/validations/validator.js";


const router = Router();



router.get('/authors', indexAuthor);
router.post('/authors', authorValidation, validateSchema, storeAuthor);
router.get('/authors/:authorId', showAuthor)
router.put('/authors/:authorId/update', authorValidation, validateSchema, updateAuthor)
router.delete('/authors/:authorId/destroy', destroyAuthor)



export default router;