import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { CreatePost, UpdatePost } from '@spexod/commonapp';


export const bookRouter = new Hono<{

    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
        authorId: string
    }

}>();

bookRouter.use('/blog/*', async (c, next) => {

    const jwt = c.req.header('Authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized myran" })
    }

    const token = jwt.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
        return c.json({ errpr: "couldnt verify, unauthorized" })
    }

    c.set('userId', payload.id)

    await next()

})


bookRouter.get('/blog/all', async (c) => {
    console.log("all reuest")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // @ts-ignore

    const blog = await prisma.post.findMany({})



    return c.json(blog)
})





bookRouter.get('/blog/:id', async (c) => {



    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = prisma.post.findUnique({
        where: {
            id: id
        }




    })






    return c.json(post)
})

bookRouter.post('/blog', async (c) => {
    console.log(('BLOG OPENED'))

    const bodyy = await c.req.json()
    const { success } = CreatePost.safeParse(bodyy)
    if (!success) {
        c.status(411)
        return c.json({ err: "zod validation errr in craeing post" })
    }
    //@ts-ignore


    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const post = await prisma.post.create({

        data: {
            title: body.title,
            content: body.content,

            authorId: c.get('userId')
        }


    })







    return c.json({
        success: "blog created ",
        id: post.id
    })
})


bookRouter.put('/blog', async (c) => {

    const bodyy = await c.req.json()
    const { success } = UpdatePost.safeParse(bodyy)
    if (!success) {
        c.status(411)
        return c.json({ err: "zod validation errr in updating post" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //@ts-ignore

    const body = await c.req.json()

    const post = await prisma.post.update({
        where: {
            //@ts-ignore
            id: body.id,
            //@ts-ignore
            // userId: c.get('userId')
        },
        data: {
            title: body.title,
            content: body.content
        }
    })


    return c.json({ "blog updated": post })
})




