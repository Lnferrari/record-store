import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import createError from 'http-errors';
import recordsRouter from './routes/recordsRouter.js'
import usersRouter from './routes/usersRouter.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser';

const app = express()
const PORT = 5000


/* ----- MONGOOSE CONFIG ----- */
mongoose.connect(config.mongooseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log('Connection to DB established!'))
.catch(err => console.log('[ERROR] We can not connect to the DB =>', err))


/* ----- EXPRESS MIDDLEWARE ----- */
app.use( express.json() )
app.use( cors({ origin: config.frontendOrigin }) )
app.use( cookieParser() )

// ENDPOINTS ----------
app.get('/', (req, res) => {
  res.send({ hello: 'RECORD SHOP API' })
})

// ROUTES -------------
app.use('/records', recordsRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  const error = new createError(400, `Looks like you are lost...`)
  next(error)
})


// ================================================


app.listen( PORT, () => {
  console.log('API has started successfully on PORT 5000')
})


// ERROR HANDLING
app.use( (err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status
    }
  })
})