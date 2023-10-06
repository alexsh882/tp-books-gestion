import Genre from "../models/genre.model.js";

export const indexGenre = async (_req, res) => {
  try {
    const genres = await Genre.find();

    if (!genres || genres.length === 0) {
      res.json({
        status: 404,
        message: "No hay géneros registrados aún.",
      });
      return;
    }
    return res.json(genres);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const showGenre = async (req, res) => {
  const { genreId } = req.params;

  try {
    const genre = await Genre.findById(genreId);

    if (!genre) {
      res.json({
        status: 404,
        message: "No existe género solicitado",
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
export const storeGenre = async (req, res) => {
  const { name } = req.body;

  try {
    const genre = await Genre.create({ name: name });

    return res.json(genre);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const updateGenre = async (req, res) => {
  const { name } = req.body;
  const { genreId } = req.params;

  try {
    const genre = await Genre.findOneAndUpdate(
      { _id: genreId },
      { name: name },
      { new: true }
    );

    return res.json(genre);
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
export const destroyGenre = async (req, res) => {
  const { genreId } = req.params;

  try {
    const genre = await Genre.deleteOne({ _id: genreId },);

    if (!genre) {
      res.json({
        status: 404,
        message: "No existe género que desea eliminar",
      });
      return;
    }
    return res.json({
      data: genre._id,
      message: "Género eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: error.status || 500,
      message: error.message || error,
    });
  }
};
