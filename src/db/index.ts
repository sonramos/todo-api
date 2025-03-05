import mongoose from 'mongoose';

export const connectDB = async (uri: string): Promise<void> => {
  if (!uri) {
    throw new Error('Erro: undefined URI!');
  }

  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
};

export const closeDB = async (): Promise<void> => {
  await mongoose.connection.close();
};

// Ouvinte para erros de conexão
mongoose.connection.on('error', (error) =>
  console.error('MongoDB Connection Error:', error),
);
