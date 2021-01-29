const { verify } = require('jsonwebtoken');

module.exports = ({ req }) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.trim()) {
    return { user: null };
  }

  const token = authorization.split(' ')[1];
  const user = verify(token, process.env.JWT_SECRET);
  return { user: user.id };
};
