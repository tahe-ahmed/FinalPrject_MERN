const { check, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() 
      .isEmail(),
    check("password").isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
