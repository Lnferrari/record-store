import createError from 'http-errors';
import User from '../../models/User.js';

const verif = async (req, res, next) => {
  try {
    const token = req.params.token;

    // Verify token
    const user = await User.verifyByToken(token);
    if (!user)
      next(
        createError(401, `Looks like your verification token is corrupt`)
      );

    // if a user exists, pass the user in the req for future use
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default verif;