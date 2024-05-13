import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
const app = new Hono();


app.post('/api/v1/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.create({
        data:{
            email: body.email,
            password: body.password
        }
    });


    const token = await sign({ id: user.id }, "secret");
    return c.json({ jwt: token });
});



app.post('/api/v1/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if (!user) {
        return c.text("user dosnt exist !!");
    }
    const token = await sign({ id: user.id }, "secret");
    return c.json({ jwt: token });
});


app.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param('id');
    console.log(id);
    return c.text('get blog route');
});


app.post('/api/v1/blog', (c) => {
    return c.text('signin route');
});


app.put('/api/v1/blog', (c) => {
    return c.text('signin route');
});
export default app;
