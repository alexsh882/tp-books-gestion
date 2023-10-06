import { checkSchema } from "express-validator";
import Genre from "../genre.model.js";

export const genreValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "El campo nombre es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 2 },
      errorMessage:
        "El campo nombre admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const { genreId } = req.params;
        const genre = await Genre.findOne( {name: value} );

        console.log('genre');
        console.log(genre);
        if (genre) {
          if (genre?._id != genreId) {
            throw new Error(
              "El género ya existe en la base de datos del sistema."
            );
          }
        }
      },
    },
  },
});
