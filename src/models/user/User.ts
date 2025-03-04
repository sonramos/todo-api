import mongoose from 'mongoose';

const AuthenticationSchema = new mongoose.Schema(
  {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  { _id: false }, // 🔹 Isso impede que o Mongoose crie um _id para authentication
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
      type: AuthenticationSchema,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('User', UserSchema);
