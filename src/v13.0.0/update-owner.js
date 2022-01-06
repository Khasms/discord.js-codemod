const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root.toSource(printOptions);

	// TODO
	// return root
	// 	.find(j.MemberExpression)
	// 	.filter(({ node }) => node.object?.property?.name === 'owner' || node.property?.name === 'owner')
	// 	.replaceWith(({ node }) => {
	// 		if (node.property.name !== 'fetchOwner') node.property = j.identifier('fetchOwner');
	// 		return j.awaitExpression(j.callExpression(node, []));
	// 	})
	// 	.toSource(printOptions);
};

module.exports.parser = parser;
