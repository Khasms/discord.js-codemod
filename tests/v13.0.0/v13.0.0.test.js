const { join } = require('path');
const { readFileSync, readdirSync } = require('fs');
const { EOL } = require('os');
const jscodeshift = require('jscodeshift');

const files = readdirSync(__dirname).filter((fileName) => fileName !== 'v13.0.0.test.js');

function readFile(filePath) {
	const fileContents = readFileSync(filePath, 'utf8').toString();
	if (EOL !== '\n') {
		return fileContents.replace(/\n/g, EOL);
	}

	return fileContents;
}

describe('v13.0.0', () => {
	for (const file of files) {
		test(file, () => {
			const path = join(__dirname, '..', '..', 'src', 'v13.0.0', `${file}.js`);
			const transform = require(path);
			const initialPath = join(__dirname, file, 'initial.js');
			const actual = transform(
				{
					source: readFile(initialPath),
					path: require.resolve(initialPath),
				},
				{ jscodeshift },
				{},
			).replaceAll(/\s/g, '');

			const expected = readFile(join(__dirname, file, 'expected.js')).replaceAll(/\s/g, '');
			expect(actual).toEqual(expected, 'The transformed version should be correct');
		});
	}
});
