const { parser } = require('../util');
module.exports.parser = parser;

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
			return node.arguments.length !== 0 && node.arguments[node.arguments.length > 1 ? 1 : 0].type === 'Literal';
		})
		.replaceWith(({ node }) => {
			const reasonIndex = node.arguments.length > 1 ? 1 : 0;

			const reasonParam = node.arguments[reasonIndex];
			const newReasonParam = j.objectExpression([
				j.property('init', j.identifier('reason'), j.literal(reasonParam.value)),
			]);

			node.arguments[reasonIndex] = newReasonParam;

			return node;
		})
		.toSource(printOptions);
};
