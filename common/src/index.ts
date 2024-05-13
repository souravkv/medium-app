import z from "zod";

export const SignupInput = z.object({

    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()

})
export const SigninInput = z.object({

    email: z.string().email(),
    password: z.string()

})
export const CreatePost = z.object({

    title: z.string(),
    content: z.string()


})
export const UpdatePost = z.object({


    title: z.string().optional(),
    content: z.string().optional()

})

export type SignupType = z.infer<typeof SignupInput>
export type SigninType = z.infer<typeof SigninInput>
export type CreateType = z.infer<typeof CreatePost>
export type UpdateType = z.infer<typeof UpdatePost>