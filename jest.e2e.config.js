module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.e2e.ts'],
  testTimeout: 100000,
  globalSetup: '<rootDir>/e2e/setup.js',
}
