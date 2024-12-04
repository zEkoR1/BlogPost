const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$', // Looks for test files ending in `.spec.ts`
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: ['src/**/*.(t|j)s'], // Adjust based on your source directory
  coverageDirectory: './coverage',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore compiled and external files
};
