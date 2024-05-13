import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify, sign, decode } from 'hono/jwt'
import { userRouter } from './routes/user'
import { bookRouter } from './routes/book'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
//old secret was secret

app.use('*', cors());

app.route('api/v1/user', userRouter)
app.route('api/v1/book', bookRouter)



export default app
