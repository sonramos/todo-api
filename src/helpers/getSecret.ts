export const getSecret = () => {
  if (!process.env.JWT_SECRET) {
    console.error('⚠️ JWT_SECRET não carregado corretamente.');
  }
  return process.env.JWT_SECRET || '';
};
