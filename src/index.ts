import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { config, Logger } from './utils/index.js'
import { corsOptions, errorHandler } from './middleware/index.js'
import appRoutes from './routes/index.js'

const app: Express = express()
const port = config.port

//[for json parse]
app.use(express.json())
//[for cors]
app.use(cors(corsOptions))
//[Set Security Headers (Prevents XSS)]
app.use(helmet())
//[ Rate Limiting (Prevents brute-force attacks)]
const limiter = rateLimit({
    windowMs: 60 * 100, // 1 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later',
})
app.use(limiter)
//[for logging API Request]
app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.info(`Incoming Request: ${req.method} ${req.url}`)
    next()
})

//routes
app.use('/api', appRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript Boilerplate')
})

//[error middleware]
app.use(errorHandler)

app.listen(port, () => {
    Logger.info(`Server is running on port ${port}!!`)
    console.log(`[server]: Server is running on port ${port}!!`)
})
