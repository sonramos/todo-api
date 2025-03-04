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

//READ
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email }).select('+authentication');
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

//CREATE
export const createUser = (values: Record<string, any>) => {
  const { authentication, ...otherValues } = values;

  const newUser = new UserModel({
    ...otherValues,
    authentication: {
      password: authentication?.password || '',
      salt: authentication?.salt || '',
      sessionToken: authentication?.sessionToken || '',
    },
  });

  return newUser.save().then((user) => user.toObject());
};

//UPDATE
export const updateUserById = (id: string, values: Record<string, any>) => {
  const updateData: Record<string, any> = { ...values };

  return UserModel.findByIdAndUpdate(id, updateData, { new: true }).select(
    '-authentication',
  );
};

//DELETE
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const deleteMany = () => UserModel.deleteMany({});
