import Book from "../models/book.model.js";
import { join } from "path";
import { unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

import fileDirName from "../utils/fileDirName.js";
const { __dirname } = fileDirName(import.meta);

export const indexBook = async (req, res) => {
  try {
    const books = await Book.find();

    if (!books || books.length === 0) {
      res.json({
        status: 404,
        message: "No hay libros registrados aún.",
      });
      return;
    }
    return res.json(books);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};

export const showBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const genre = await Book.findById(bookId).populate(["genres", "author"]);

    if (!genre) {
      res.json({
        status: 404,
        message: "No existe libro solicitado.",
      });
      return;
    }

    return res.json(genre);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const storeBook = async (req, res) => {
  const { title, yearPublication, author, genres } = req.body;
  const { image } = req.files;

  const original_filename = image.name.split(".")[0];
  const format = image.name.split(".")[1];
  // return res.json({image: { original_filename, format,  }});
  try {
    const file_name = uuidv4() + "." + format;

    const uploadPath = join(__dirname, "../../assets/covers/", file_name);

    image.mv(uploadPath, function (err) {
      if (err) throw new Error(err);
    });

    const book = await Book.create({
      title,
      yearPublication,
      author,
      genres,
      image: { original_filename, format, file_name },
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};

export const updateBook = async (req, res) => {
  const { title, yearPublication, author, genres } = req.body;
  const { bookId } = req.params;
  const { image } = req.files;

  // return res.json({image: { original_filename, format,  }});
  try {
    const book = await Book.findById(bookId);

    if (image) {
      const original_filename = image.name.split(".")[0];
      const format = image.name.split(".")[1];
      const new_file_name = uuidv4() + "." + format;

      const unlinkPath = join(
        __dirname,
        "../../assets/covers/",
        book.image.file_name
      );
      unlink(unlinkPath, function (err) {
        if (!err) {
          console.log("cover eliminado.");
        }else{
            console.log(err);
        }
      });
      
      const uploadPath = join(__dirname, "../../assets/covers/", new_file_name);

      book.image.original_filename = original_filename;
      book.image.format = format;
      book.image.file_name = new_file_name;

      image.mv(uploadPath, function (err) {
        if (err) throw new Error(err);
      });
    }

    book.title = title;
    book.yearPublication = yearPublication;
    book.author = author;
    book.genres = genres;

    book.save();

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const destroyBook = async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    return res
      .status(404)
      .json({ message: "El libro NO existe en la base de datos." });
  }

  const uploadPath = join(
    __dirname,
    "../../assets/covers/",
    `${book.image.file_name}`
  );

  try {
    unlink(uploadPath, function (err) {
      if (!err) {
        console.log("cover eliminado.");
      }
    });

    await Book.deleteOne({ _id: bookId });

    return res.json({ success: "Libro eliminado correctamente." });
  } catch (error) {
    return res.json(error);
  }
};
