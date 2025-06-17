import * as z from "zod";


export const RegisterSchema = z.object({
    email: z
        .string()
        .nonempty({
            message: "The email must not be empty",
        })
        .max(64, { message: "Your email is too long, the limit is 64 letters." })
        .email({
            message: "Please add a valid email",
        }),
    firstName: z
        .string()
        .nonempty({
            message: "The firs name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",
        }),
    name: z
        .string()
        .nonempty({
            message: "The name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",

        }),
    password: z
        .string()
        .nonempty({
            message: "The password must not be empty",
        })
        .max(30, { message: "Your password is too long, the limit is 30 letters." })
        .min(6, {
            message: "The password must be at least 6 characters long",
        }),
});

export const LoginSchema = z.object({
    email: z.string()
        .email({
            message: "Enter a valid email",
        })
        .nonempty({
            message: "The email must not be empty",
        }),
    password: z.string()
        .min(6, {
            message: "The password must be at least 6 characters long",
        })
        .nonempty({
            message: "The password must not be empty",
        }),
});

export const RoleSchema = z.object({
    permission: z.array(z.string()),
    color: z.string(),
    name: z
        .string()
        .min(4, {
            message: "The role name must be at least 4 characters long",
        })
        .max(64, {
            message: "Your role name is too long, the limit is 64 letters.",
        }),
});

export const RoleUpdateSchema = z.object({
    uuid: z.string(),
    permission: z.array(z.string()),
    color: z.string(),
    name: z
        .string()
        .min(4, {
            message: "The role name must be at least 4 characters long",
        })
        .max(64, {
            message: "Your role name is too long, the limit is 64 letters.",
        }),
});


export const PermissionSchema = z.object({
    name: z
        .string()
        .min(5, {
            message: "The permission must be at least 6 characters long",
        })
        .max(64, {
            message: "Your permission is too long, the limit is 64 letters.",
        }),
})

export const PermissionUpdateSchema = z.object({
    uuid: z.string(),
    name: z
        .string()
        .min(5, {
            message: "The permission must be at least 6 characters long",
        })
        .max(64, {
            message: "Your permission is too long, the limit is 64 letters.",
        }),
})

export const UpdateUserSchema = z.object({
    uuid: z.string(),
    email: z
        .string()
        .nonempty({
            message: "The email must not be empty",
        })
        .max(64, { message: "Your email is too long, the limit is 64 letters." })
        .email({
            message: "Please add a valid email",
        }),
    firstName: z
        .string()
        .nonempty({
            message: "The firs name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",
        }),
    name: z
        .string()
        .nonempty({
            message: "The name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",

        }),
    role: z
        .string()
        .nonempty({
            message: "The name must not be empty",
        }),
    password: z
        .string(),
 
});
export const UserSchema = z.object({
    email: z
        .string()
        .nonempty({
            message: "The email must not be empty",
        })
        .max(64, { message: "Your email is too long, the limit is 64 letters." })
        .email({
            message: "Please add a valid email",
        }),
    firstName: z
        .string()
        .nonempty({
            message: "The firs name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",
        }),
    name: z
        .string()
        .nonempty({
            message: "The name must not be empty",
        })
        .max(15, { message: "Your name is too long, the limit is 15 letters." })
        .min(3, {
            message: "The name must be at least 3 characters long",

        }),
    role: z
        .string()
        .nonempty({
            message: "The name must not be empty",
        }),
    password: z
        .string()
        .nonempty({
            message: "The password must not be empty",
        })
        .max(30, { message: "Your password is too long, the limit is 30 letters." })
        .min(6, {
            message: "The password must be at least 6 characters long",
        }),
});