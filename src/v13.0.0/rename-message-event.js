const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression)
		.filter(({ node }) => {
			return ['on', 'once', 'emit'].includes(node.callee.property?.name) && node.arguments[0].value === 'message';
		})
		.forEach(({ node }) => {
			node.arguments[0].value = 'messageCreate';
		})
		.toSource(printOptions);
};
