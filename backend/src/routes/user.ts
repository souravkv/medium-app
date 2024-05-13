import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { SignupInput, SigninInput } from '@spexod/commonapp';



export const userRouter = new Hono<{

    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const bodyy = await c.req.json()
    const { success } = SignupInput.safeParse(bodyy)
    if (!success) {
        c.status(411)
        return c.json({ err: "zod validation errr" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const body = await c.req.json()

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)


    return c.json({ jwt: token + "sda" })
})

userRouter.post('/signin', async (c) => {
    const bodyy = await c.req.json()
    const { success } = SigninInput.safeParse(bodyy)
    if (!success) {
        c.status(411)
        return c.json({ err: "zod validation in errr" })
    }



    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password

        }
    })

    if (!user) {

        return c.text("user dosnt exist !!")
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({ jwt: token })
})