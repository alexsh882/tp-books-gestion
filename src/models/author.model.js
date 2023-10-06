import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
    },    
    biography: {
      type: Schema.Types.String, 
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Author", authorSchema);
