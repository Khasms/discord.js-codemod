const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'fetchApplication',
				},
			},
		})
		.replaceWith(({ node }) => j.memberExpression(j.identifier(node.callee.object.name), j.identifier('application')))
		.toSource(printOptions);
};

module.exports.parser = parser;
