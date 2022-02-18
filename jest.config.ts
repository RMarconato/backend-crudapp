module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['./src/**/*.ts'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/src/decorators/',
    '<rootDir>/src/auth/',
    '.module.ts',
    '.dto.ts',
    '.interface.*.ts',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  rootDir: './',
  roots: ['src', 'test'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
