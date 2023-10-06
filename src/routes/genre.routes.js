import { Router } from "express";
import { destroyGenre, indexGenre, showGenre, storeGenre, updateGenre } from "../controllers/genre.controller.js";
import { genreValidation } from "../models/validations/genre.schema.js";
import { validateSchema } from "../models/validations/validator.js";


const router = Router();


router.get('/genres', indexGenre);
router.post('/genres', genreValidation, validateSchema, storeGenre);
router.get('/genres/:genreId', showGenre)
router.put('/genres/:genreId/update', genreValidation, validateSchema, updateGenre)
router.delete('/genres/:genreId/destroy', destroyGenre)



export default router;
