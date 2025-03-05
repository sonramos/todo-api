export const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not loaded');
  }
  return process.env.JWT_SECRET || '';
};
