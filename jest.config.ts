import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['.'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/server/**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['src/server/console', 'src/server/migration'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '@quramy/prisma-fabbrica/scripts/jest-prisma',
    './jest.setup.ts',
  ],
}

export default config
