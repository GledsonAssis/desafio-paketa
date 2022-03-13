import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import menuRoutes from './routes/menu'

const HOST = process.env.HOST || 'https://localhost'
const PORT = process.env.PORT || 8000
const VERSION = process.env.VERSION || 'v1'
const LOGMSG = '⚡️[Paketá Credito - Menu]:'
mongoose.set('debug', false)
mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost:27017/local',
    {},
    err => {
        const msg = err
            ? `${LOGMSG} Failed to connect to MongoDB: ${err}`
            : `${LOGMSG} MongoDB connection established successfully`
        console.log(msg)
    },
)

const app = express()
app.use(express.json())
app.use(`/${VERSION}/menu`, menuRoutes)
app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`)
})
