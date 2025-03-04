module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__tests__'],
  setupFiles: ['dotenv/config'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  // Define variáveis de ambiente para testes
  globals: {
    'process.env': {
      NODE_ENV: 'test',
      DB_URI_TEST: 'mongodb://localhost:27017/todo-db-test',
      JWT_SECRET: 'test-secret',
    },
  },
};
