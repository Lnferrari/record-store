import { body, validationResult } from 'express-validator';
import createError from 'http-errors';

/** User Vali  and  Sani rules*/
export const userValidationRules = () => {
  return [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Not a valid email address.')
      .normalizeEmail(),
    body('password')
      //   .custom((value) => {
      //     const regex =
      //       /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
      //     //returns a boolean
      //     const res = regex.test(value);
      //     return res;
      //   })
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'Put some more chars. 1 lowercase, 1 capital, 1 number & 1 out of !@#$%^&* pleaaase'
      ),
  ];
};

/**User ValiSani Error Handling */
export const userValidationErrorHandling = (req, res, next) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const arrErrors = errors.array();
  const errorsSummary = mergeErrors(arrErrors);
  const err = new createError(422, errorsSummary);
  next(err);
};

const mergeErrors = (arrErrors) => {
  return arrErrors.map((err) => `${err.msg}`).join(' ');
};