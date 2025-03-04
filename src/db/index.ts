import mongoose from 'mongoose';

export const connectDB = async (uri: string): Promise<void> => {
  if (!uri) {
    throw new Error('Erro: URI de banco de dados não definida!');
  }

  try {
    await mongoose.connect(uri);
    console.log('🔥 Conectado ao MongoDB!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
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
