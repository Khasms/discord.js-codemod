const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'generateInvite',
				},
			},
		})
		.filter(({ node }) => node.arguments[0].type !== 'ObjectExpression')
		.forEach(({ node }) => {
			node.arguments[0] = j.objectExpression([j.property('init', j.identifier('permissions'), node.arguments[0])]);
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
