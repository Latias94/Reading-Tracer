const express = require('express');
const Book = require('../../models/Book');

const router = express.Router();

// GET: Get all books
router.get('/', (req, res) => {
  const errors = {};

  Book.find()
    .sort({
      updateDate: -1
    })
    .then((books) => {
      if (!books) {
        errors.booknotfound = 'No books found';
        return res.status(404).json(errors);
      }

      res.json(books);
      return false;
    })
    .catch(() => res.status(404).json({
      booknotfound: 'No books found'
    }));
});

// GET: Get one book by id
router.get('/:id', (req, res) => {
  const errors = {};

  Book.findById(req.params.id)
    .then((books) => {
      if (!books) {
        errors.booknotfound = 'No books found';
        return res.status(404).json(errors);
      }

      res.json(books);
      return false;
    })
    .catch(() => res.status(404).json({
      booknotfound: 'No books found'
    }));
});

// POST: Create new book
router.post('/', (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    currentPage: req.body.currentPage,
    totalPage: req.body.totalPage,
    quote: {
      content: req.body.quoteContent,
      author: req.body.quoteAuthor,
    }
  });

  book.save().then((book) => {
    return res.json(book);
  });
});

// PUT can only update currentPage for simplify requirement
router.put('/:id', (req, res) => {
  const errors = {};
  const bookFields = {};
  if (req.body.title) bookFields.title = req.body.title;
  if (req.body.description) bookFields.description = req.body.description;
  if (req.body.currentPage) bookFields.currentPage = req.body.currentPage;
  if (req.body.totalPage) bookFields.totalPage = req.body.totalPage;
  if (req.body.quoteContent) {
    if (req.body.quoteAuthor) {
      bookFields.quote = {
        content: req.body.quoteContent,
        author: req.body.quoteAuthor,
      };
    } else {
      bookFields.quote = {
        content: req.body.quoteContent,
        author: '',
      };
    }
  }

  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        bookFields.updateDate = Date.now();
        // Update
        Book.findByIdAndUpdate(
          req.params.id,
          bookFields, {
            new: true
          },
          (err, book) => {
            return err ? res.status(404).json(err) :
              res.json(book);
          },
        );
      } else {
        errors.booknotfound = 'No books found';
        return res.status(404).json(errors);
      }
    });
}, );

// DELETE delete exist book by id
router.delete('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        // Delete
        Book.findByIdAndRemove(req.params.id, (err) => {
          return err ?
            res.status(404).send(err) :
            res.json({
              success: true
            });
        });
      } else {
        return res.status(404).json({
          booknotfound: 'No books found',
        });
      }
      return false;
    })
    .catch(() => res.status(404).json({
      booknotfound: 'No books found',
    }));
}, );

module.exports = router;