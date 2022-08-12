const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next({ message: '"name" is required', code: 400 });
  }
  if (name.length < 5) {
    return next({ message: '"name" length must be at least 5 characters long', code: 422 });
  }

  return next();
};

module.exports = validateName;
