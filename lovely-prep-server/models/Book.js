const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  quote: {
    content: {
      type: String,
    },
    author: {
      type: String,
    }
  }
});

module.exports = mongoose.model('books', BookSchema);
