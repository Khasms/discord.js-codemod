const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	root
		.find(j.CallExpression)
		.filter(({ node }) => ['fetchBan', 'fetchBans'].includes(node.callee.property?.name))
		.forEach(({ node }) => {
			node.callee.property.name = 'bans.fetch';
		});

	return root.toSource(printOptions);
};
