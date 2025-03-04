import { authentication, random } from '../helpers';
import { UserModel } from '../models/user/User';
import { UserSchema, UserUpdateSchema } from '../validations/userValidation';

// CREATE
export const createUserService = async (userData: any) => {
  const { email, name, password } = userData;

  if (!email || !name || !password) {
    throw new Error('Invalid data');
  }

  const parsedData = UserSchema.parse({
    email,
    name,
    authentication: {
      password,
    },
  });

  const registeredUser = await findUserByEmail(email);
  if (registeredUser) {
    throw new Error('Invalid data');
  }

  const salt = random();
  const hashedPassword = authentication(salt, password);
  if (!hashedPassword) {
    throw new Error('Error generating hash');
  }

  const newUser = new UserModel({
    ...parsedData,
    authentication: {
      salt: salt,
      password: hashedPassword,
      sessionToken: '',
    },
  });

  return newUser.save().then((user) => user.toObject());
};

// GET
// Find All
export const findAllUsersService = async () => {
  return await UserModel.find();
};
// Find by ID
export const findUserByIdService = async (id: string) => {
  if (!id) {
    throw new Error('Invalid id');
  }
  return await UserModel.findById(id);
};
// Find by Email
export const findUserByEmail = async (email: string) => {
  if (!email) {
    throw new Error('Invalid email');
  }
  return await UserModel.findOne({ email }).select(
    '+authentication +authentication.salt +authentication.password',
  );
};
// Find by SessionToken
export const findUserBySessionToken = async (token: string) => {
  if (!token) {
    throw new Error('Invalid token');
  }
  return await UserModel.findOne({ 'authentication.sessionToken': token });
};

// UPDATE
export const updateUserByIdService = async (
  id: string,
  updatedData: Record<string, any>,
) => {
  const parsedData = UserUpdateSchema.parse(updatedData);

  return await UserModel.findByIdAndUpdate(id, parsedData, {
    new: true,
  }).select('-authentication');
};

// DELETE
export const deleteUserByIdService = async (id: string) => {
  if (!id) {
    throw new Error('Invalid ID');
  }
  return await UserModel.findOneAndDelete({ _id: id });
};
