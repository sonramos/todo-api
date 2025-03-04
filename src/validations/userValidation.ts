import { z } from 'zod';

const NAME_LENGHT = 3;

export const UserSchema = z.object({
  name: z
    .string()
    .min(NAME_LENGHT, `Name should have at least ${NAME_LENGHT} characters`),
  email: z.string().email('Invalid Email'),
  authentication: z.object({
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters')
      .regex(/[A-Z]/, 'Password must have at least one Uppercase letter')
      .regex(/[a-z]/, 'Password must have at least one Lowercase letter')
      .regex(/[0-9]/, 'Password must have at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must have at least um special character',
      ),
  }),
});

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(NAME_LENGHT, `Name should have at least ${NAME_LENGHT} characters`)
    .optional(),
  email: z.string().email('Invalid Email').optional(),
});
