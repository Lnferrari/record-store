import createError from 'http-errors'

const isUserVerified = (req, res, next) => {
  if (!req.user.verified.status)
    next(createError(401, `Verify your email addres fool. We already send an email!`))

  next()
}

export default isUserVerified