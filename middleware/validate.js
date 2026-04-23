const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    error: 'ValidationError',
    details: errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
      value: e.value,
    })),
  });
}

module.exports = validate;
