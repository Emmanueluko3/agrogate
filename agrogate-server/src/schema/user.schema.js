const { z } = require("zod");

const updateUserSchema = z
  .object({
    name: z.string().optional(),
    username: z
      .string()
      .regex(/^\S+$/, {
        message: "Username must not contain spaces",
      })
      .optional(),
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be at most 16 characters long" })
      .optional(),
    profile_image: z.string().optional(),
    cover_image: z.string().optional(),
    country: z.string().optional(),
    bio: z.string().optional(),
  })
  .strict();

const joinRoomSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  room: z.string({ required_error: "Room is required" }),
});

module.exports = { updateUserSchema, joinRoomSchema };
