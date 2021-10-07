const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.MemberExpression, {
			property: {
				name: 'owner',
			},
		})
		.filter(({ node }) => (node.property.name ?? node.object.property) === 'fetchOwner')
		.replaceWith(({ node }) => {
			let newNode;
			if (node.property.name === 'id') {
				node.property.name = 'ownerId';
				newNode = node;
			} else {
				node.property.name = 'fetchOwner';
				newNode = j.awaitExpression(j.callExpression(node, []));
			}
			return newNode;
		})
		.toSource(printOptions);
};
