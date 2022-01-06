const { readdirSync } = require('fs');
const { join } = require('path');
const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	let files = readdirSync(__dirname);
	files = files.filter((f) => f !== 'all.js');

	for (const f of files) {
		const path = join(__dirname, f);
		const transform = require(path);
		file.source = transform(file, api, options);
	}

	return file.source;
};

module.exports.parser = parser;
