module.exports = {
	collectCoverageFrom: [
		'./**/*.js',
		'!babel.config.js',
		'!.eslintrc.js',
		'!jest.config.js',
		'!webpack.config.js',
		'!coverage/**/*.js',
		'!utils/*',
		'!mocks/**/*.js',
		'!.webpack/**/*.*',
		'!models/*',
		'!scripts/*',
		'!migrations/*',
		'!seeders/*',
		'!database/**/*.js',
		'utils/**/*.js',
	],
	coverageThreshold: {
		global: {
			statements: 10,
			branches: 0,
			functions: 10,
			lines: 10,
		},
	},
	moduleNameMapper: {
		'@(utils|services)(.*)$': '<rootDir>/$1/$2',
		'@mocks(.*)$': '<rootDir>/__mocks__/$1',
		'@daos(.*)$': '<rootDir>/daos/$1',
		'@models(.*)$': '<rootDir>/models/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
