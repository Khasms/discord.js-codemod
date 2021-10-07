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
					name: 'setPresence',
				},
			},
		})
		.forEach(({ node }) => {
			node.arguments[0] = j.objectExpression([
				j.property(
					'init',
					j.identifier('activities'),
					j.arrayExpression([node.arguments[0].properties.find((prop) => prop.key.name === 'activity').value]),
				),
			]);
		})
		.toSource(printOptions);
};
