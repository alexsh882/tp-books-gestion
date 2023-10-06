import { checkSchema } from "express-validator";

export const authorValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "El campo nombre es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo nombre admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "El campo apellido es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo apellido admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  biography: {
    notEmpty: {
      errorMessage: "El campo biografía es obligatorio",
    },
  },
});
