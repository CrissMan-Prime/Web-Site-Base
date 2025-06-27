import * as z from "zod";

const uuid = z.string().uuid({ message: "Invalid UUID format." });

const email = z
    .string()
    .nonempty({
        message: "The email must not be empty.",
    })
    .max(64, { message: "Your email is too long, the limit is 64 letters." })
    .email({
        message: "Please add a valid email.",
    });

const firstName = z
    .string()
    .nonempty({
        message: "The firs name must not be empty.",
    })
    .max(15, { message: "Your name is too long, the limit is 15 letters." })
    .min(3, {
        message: "The name must be at least 3 characters long.",
    });

const name = z
    .string()
    .nonempty({
        message: "The name must not be empty.",
    })
    .max(20, { message: "Your name is too long, the limit is 20 letters." })
    .min(3, {
        message: "The name must be at least 3 characters long.",
    });

const description = z
    .string()
    .trim()
    .min(12, "Description must be at least 12 characters long.")
    .max(40, "Description must not exceed 40 characters.");

const password = z
    .string()
    .nonempty({
        message: "The password must not be empty.",
    })
    .max(30, { message: "Your password is too long, the limit is 30 letters." })
    .min(6, {
        message: "The password must not exceed 6 characters.",
    });

const image = z.any().refine(
    (file) => {
        const f = file instanceof File ? file : file?.[0];
        return f && ["image/jpeg", "image/png", "image/webp"].includes(f.type);
    },
    {
        message: "Image must be JPG, PNG, or WEBP.",
    },
);

const favicon = z.any().refine(
    (file) => {
        const f = file instanceof File ? file : file?.[0];
        return f && ["image/ico"].includes(f.type);
    },
    {
        message: "Image must be Icon.",
    },
);

const role = z.string().nonempty({
    message: "The name must not be empty.",
});

export const RegisterSchema = z.object({
    email,
    firstName,
    name,
    password,
});

export const LoginSchema = z.object({
    email,
    password,
});

export const RoleSchema = z.object({
    permission: z.array(z.string()),
    color: z.string(),
    name,
});

export const RoleUpdateSchema = z
    .object({
        uuid,
    })
    .merge(
        RoleSchema.partial({
            permission: true,
            color: true,
            name: true,
        }),
    );

export const PermissionSchema = z.object({
    uuid,
    name,
});

export const ImageSchema = z.object({
    image,
});

export const PermissionUpdateSchema = z
    .object({
        uuid,
    })
    .merge(PermissionSchema.partial({}));

export const UserSchema = z.object({
    uuid,
    email,
    firstName,
    name,
    role,
    password,
});

export const UpdateUserSchema = z
    .object({
        uuid,
        password,
    })
    .merge(
        UserSchema.partial({
            email: true,
            firstName: true,
            name: true,
            role: true,
        }),
    );

export const AdminUpdateUserSchema = z
    .object({
        uuid,
    })
    .merge(
        UserSchema.partial({
            email: true,
            firstName: true,
            name: true,
            role: true,
            password: true,
        }),
    );

const SiteSettingSchema = z.object({
    identify: z.string(),
    theme: z.string(),
    favicon,
    logo: image,
    description,
    maintenance: z.boolean(),
    maintenanceMessage: z.string(),
    email,
    phone: z.number(),
    address: z.string(),
    color: z.string(),
    name,
});

export const UpdateSettingSchema = SiteSettingSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for update.",
  }
);