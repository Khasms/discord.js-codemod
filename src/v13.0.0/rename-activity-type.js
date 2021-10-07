const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.Literal, {
			value: 'CUSTOM_STATUS',
		})
		.replaceWith(({ node }) => {
			node.value = 'CUSTOM';
			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
