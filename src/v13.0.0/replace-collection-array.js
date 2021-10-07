const { constructName } = require('../util');
const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	// Replace Collection#array()
	root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'array',
				},
			},
		})
		.replaceWith(({ node }) => {
			return j.arrayExpression([
				j.spreadElement(
					j.callExpression(
						j.memberExpression(j.identifier(constructName(node.callee.object)), j.identifier('values')),
						[],
					),
				),
			]);
		});

	// Replace Collection#keyArray()
	root
		.find(j.CallExpression, {
			callee: {
				property: {
					name: 'keyArray',
				},
			},
		})
		.replaceWith(({ node }) => {
			return j.arrayExpression([
				j.spreadElement(
					j.callExpression(
						j.memberExpression(j.identifier(constructName(node.callee.object)), j.identifier('keys')),
						[],
					),
				),
			]);
		});

	return root.toSource(printOptions);
};

module.exports.parser = parser;
