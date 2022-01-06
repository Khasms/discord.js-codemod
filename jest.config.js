/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.js'],
	coverageProvider: 'v8',
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/src/cli.js', '<rootDir>/src/util.js', '<rootDir>/src/v13.0.0/all.js'],
	coverageReporters: ['text', 'lcov', 'clover'],
	coverageThreshold: {
		global: {
			branches: 70,
			lines: 70,
			statements: 70,
		},
	},
	transform: {
		'^.+\\.(t|j)sx?$': ['@swc/jest'],
	},
};
