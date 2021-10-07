const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	root
		.find(j.CallExpression)
		.filter(({ node }) => ['convertToBuffer', 'str2ab'].includes(node.callee.property?.name))
		.forEach(({ node }) => {
			node.callee = j.memberExpression(j.identifier('Buffer'), j.identifier('from'));
		});

	return root.toSource(printOptions);
};

module.exports.parser = parser;
