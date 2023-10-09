import { checkSchema } from "express-validator";
import Book from "../book.model.js";

export const bookValidation = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "El campo título es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo título admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const { bookId } = req.params;
        const book = await Book.findOne({ title: value });

        console.log("book");
        console.log(book?._id.toString());
        console.log(bookId);
        if (book) {
          if (book?._id?.toString() != bookId) {
            throw new Error(
              "El título ya existe en la base de datos del sistema."
            );
          }
        }
      },
    },
  },
  yearPublication: {
    notEmpty: {
      errorMessage: "El campo año de publicación es obligatorio",
    },
    isNumeric: {
      errorMessage: "El campo año de publicación debe ser numérico",
    },
  },
  image: {
    custom: {
      options: async (value, { req }) => {
        const image = req.files?.image;
        const { bookId } = req.params;
        if (image) {
          switch (image.mimetype) {
            case "image/jpg":
              return "image/jpg";
            case "image/jpeg":
              return "image/jpeg";
            case "image/png":
              return "image/png";
            default:
              throw {
                message: "El campo debe ser una imagen.",
              };
          }
        } else {
          if (!bookId) {
            throw new Error("El campo imagen de portada es obligatorio.");
          }
        }
      },
    },
  },
  genres: {
    notEmpty: {
      errorMessage: "El género es requerido.",
    },
    isArray: {
      errorMessage: "Debe ser un array.",
    },
    isMongoId: {
      errorMessage: "Debe ser un object ID",
    },
  },
  author: {
    notEmpty: {
      errorMessage: "El autor es requerido.",
    },
    isMongoId: {
      errorMessage: "Debe ser un object ID",
    },
  },
});
