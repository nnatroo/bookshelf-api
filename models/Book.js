const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
      min: [0, 'publishedYear must be >= 0'],
      max: [new Date().getFullYear() + 1, 'publishedYear cannot be in the far future'],
    },
    rating: {
      type: Number,
      min: [0, 'rating must be between 0 and 5'],
      max: [5, 'rating must be between 0 and 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Book', bookSchema);
