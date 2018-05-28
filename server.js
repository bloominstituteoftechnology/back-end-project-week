import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

export default app
