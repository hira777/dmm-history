module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/chrome/src/$1',
    '^mock/(.*)$': '<rootDir>/mock/$1'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  setupFiles: ['./test/setup.ts']
};
