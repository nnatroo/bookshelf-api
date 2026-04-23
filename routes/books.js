const express = require('express');
const { body } = require('express-validator');

const validate = require('../middleware/validate');
const ctrl = require('../controllers/bookController');

const router = express.Router();

const nextYear = new Date().getFullYear() + 1;

const bookValidators = [
  body('title').isString().trim().notEmpty().withMessage('title is required'),
  body('author').isString().trim().notEmpty().withMessage('author is required'),
  body('genre').optional().isString().trim(),
  body('publishedYear')
    .optional()
    .isInt({ min: 0, max: nextYear })
    .withMessage(`publishedYear must be an integer between 0 and ${nextYear}`),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('rating must be a number between 0 and 5'),
];

router.get('/', ctrl.listBooks);
router.get('/:id', ctrl.getBook);
router.post('/', bookValidators, validate, ctrl.createBook);
router.put('/:id', bookValidators, validate, ctrl.updateBook);
router.delete('/:id', ctrl.deleteBook);

module.exports = router;
