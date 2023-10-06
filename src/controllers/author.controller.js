import Author from "../models/author.model.js";

export const indexAuthor = async (req, res) => {
  try {
    const authors = await Author.find();

    if (!authors || authors.length === 0) {
      res.status(404).json({
        status: 404,
        message: "No hay autores registrados aún.",
      });
      return;
    }
    return res.json(authors);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const showAuthor = async (req, res) => {
  const { authorId } = req.params;

  try {
    const author = await Author.findById(authorId);

    if (!author) {
      res.status(404).json({
        status: 404,
        message: "No existe el autor solicitado.",
      });
      return;
    }
    return res.json(author);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const storeAuthor = async (req, res) => {
  const { name, lastName, biography } = req.body;

  try {
    const author = await Author.create({ name, lastName, biography });

    return res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const updateAuthor = async (req, res) => {
  const { name, lastName, biography } = req.body;
  const { authorId } = req.params;

  try {
    const author = await Author.findByIdAndUpdate(
      authorId,
      {
        name,
        lastName,
        biography,
      },
      { new: true }
    );

    console.log(author);

    return res.json(author);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const destroyAuthor = async (req, res) => {
  const { authorId } = req.params;

  try {
    const author = await Author.findOneAndDelete(authorId);

    if (!author) {
      res.status(404).json({
        status: 404,
        message: "No existe el autor solicitado.",
      });
      return;
    }
    return res.json(author);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
