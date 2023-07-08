/* eslint-disable @typescript-eslint/no-var-requires */
// import compilerOptions from "./tsconfig.json" assert {type: "json"};
// const { pathsToModuleNameMapper } = require('ts-jest');

// const { compilerOptions } = require('./tsconfig.json');

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  ...createJestConfig({
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
  }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  pathsToModuleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>',
  // }),
};

export default createJestConfig(config);
// module.exports = config;
