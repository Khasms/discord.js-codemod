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
					name: 'addMember',
				},
			},
		})
		.forEach(({ node }) => {
			node.callee.property.name = 'members.add';
		})
		.toSource(printOptions);
};
