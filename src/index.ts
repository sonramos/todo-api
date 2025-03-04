import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/router';

dotenv.config();
console.log('🔍 JWT_SECRET carregado:', process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;
let DB_URI;
if (process.env.NODE_ENV == 'test') {
  DB_URI = process.env.DB_URI_TEST;
} else {
  DB_URI = process.env.DB_URI;
}
console.log(DB_URI);
app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use('/api', router());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

mongoose.Promise = Promise;
if (!DB_URI) {
  console.error('Erro: DB_URI não definida!');
  process.exit(1);
}

mongoose.connect(DB_URI).catch((error) => {
  console.error('❌ Erro ao conectar ao MongoDB:', error);
  process.exit(1);
});

mongoose.connection.on('error', (error) =>
  console.error('MongoDB Connection Error:', error),
);

export default app;
