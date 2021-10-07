const { ChannelTypes } = require('../constants');
const { parser } = require('../util');
module.exports.parser = parser;

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	return root
		.find(j.Literal)
		.filter(({ node }) => Object.keys(ChannelTypes).includes(node.value))
		.forEach(({ node }) => {
			node.value = ChannelTypes[node.value];
		})
		.toSource(printOptions);
};
