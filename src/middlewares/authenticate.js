import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  req.managerId = decoded.id;
  return next();
}
