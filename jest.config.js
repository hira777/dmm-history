module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/chrome/src/$1',
    '^mock/(.*)$': '<rootDir>/mock/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/chrome/tsconfig.json',
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFiles: ['./test/setup.ts'],
};
