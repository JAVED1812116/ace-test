const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const userRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1 ,
  message: 'Too many requests, please try again later.',
});

const helmetMiddleware = helmet();

const get_users = (req, res) => {
  return res.status(200).send({ message: "I am protected" });
};

module.exports = [
  helmetMiddleware,
  userRateLimiter, 
  get_users,
];
