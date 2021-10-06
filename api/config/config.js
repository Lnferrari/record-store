import dotenv from 'dotenv'
import fs from 'fs'
import path, { dirname } from 'path'
import { env } from 'process'
import { fileURLToPath } from 'url'

// Check what env we are in
// if we are in production always load the .env
// if we are in development (locally) load the development.env

const __dirname = dirname(fileURLToPath(import.meta.url))

// on PROD always load .env
if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  // if we are locally/development
  let envPath = path.join(__dirname, '..', '.env.development')

  // What if .env.development doesn't exist??
  if (fs.existsSync(envPath)) {
    dotenv.config({path: envPath})
  } else {
    dotenv.config()
  }
}

// Once env variables are loaded we have acces to the process variables
// Create an object with all the secrets and share it with server.js
const config = {
  env: env.NODE_ENV || 'development',
  frontendOrigin: env.FRONTEND_ORIGIN_DEV || env.FRONTEND_ORIGIN_PROD,
  secretKey: env.SECRET_KEY_DEV || env.SECRET_KEY_PROD,
  mongooseUrl: env.MONGOOSE_DB_DEV || env.MONGOOSE_DB_PROD,
  verifSecretKey: env.EMAIL_VERIF_KEY_DEV || env.EMAIL_VERIF_KEY_PROD,
  email: env.EMAIL,
  email_pass: env.EMAIL_PASS
}

export default config