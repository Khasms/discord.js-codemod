const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'ban',
				},
			},
		})
		.filter(({ node }) => {
			return node.arguments.length !== 0 && node.arguments[0].type === 'Literal';
		})
		.replaceWith(({ node }) => {
			const reasonParam = node.arguments[0];
			const newReasonParam = j.objectExpression([
				j.property('init', j.identifier('reason'), j.literal(reasonParam.value)),
			]);

			node.arguments[0] = newReasonParam;

			return node;
		})
		.toSource(printOptions);
};

module.exports.parser = parser;
