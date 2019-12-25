module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/chrome/src/$1',
    '^mock/(.*)$': '<rootDir>/mock/$1'
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  setupFiles: ['./test/setup.ts']
};
