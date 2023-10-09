import { Schema, model } from "mongoose";
import { environments } from "../config/environments.js";

const booksSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    yearPublication: {
      type: Schema.Types.Number,
      requited: true,
    },
    image: {
      original_filename: {
        type: Schema.Types.String,
        required: true,
      },
      format: {
        type: Schema.Types.String,
        required: true,
      },
      file_name: {
        type: Schema.Types.String,
        required: true,
      },
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  {
    virtuals: {
      'image.urlCover': {
        get() {
          return `${environments.APP_URL}:${environments.APP_PORT}/covers/${this.image.file_name}`;
        },
      },
    },
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals : true}
  }
);

export default model("Book", booksSchema);
