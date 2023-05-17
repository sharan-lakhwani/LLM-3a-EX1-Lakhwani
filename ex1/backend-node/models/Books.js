import mongoose from "mongoose";
const Schema = mongoose.Schema;

const booksSchema = new Schema(
  {
    ISBN: {
      type: String,
    },
    title: {
      type: String,
    },
    year: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
);

booksSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Books = mongoose.model("Books", booksSchema);
export default Books;
