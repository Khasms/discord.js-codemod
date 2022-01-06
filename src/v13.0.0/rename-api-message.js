const addImports = require('jscodeshift-add-imports');
const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	// Update uses
	const uses = root
		.find(j.Identifier, {
			name: 'APIMessage',
		})
		.forEach(({ node }) => {
			node.name = 'MessagePayload';

			return node;
		});

	if (uses.size() > 0) {
		addImports(root, [j.template.statement`import { MessagePayload } from 'discord.js'`]);
	}

	return root.toSource(printOptions);
};

module.exports.parser = parser;
