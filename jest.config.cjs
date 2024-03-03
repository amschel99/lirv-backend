module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  testTimeout: 30000, // Set the timeout value in milliseconds (e.g., 10000 for 10 seconds)
};
