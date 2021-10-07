const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	// Update uses
	root
		.find(j.Identifier, {
			name: 'APIMessage',
		})
		.forEach(({ node }) => {
			node.name = 'MessagePayload';

			return node;
		});

	const imports = root
		.find(j.ImportDeclaration)
		.filter(({ node }) => node.source.value === 'discord.js')
		.forEach(({ node }) => {
			const specs = node.specifiers;
			// Add new to import
			const exists = specs.find((s) => s.imported.name === 'MessagePayload');
			if (!exists) specs.push(j.importSpecifier(j.identifier('MessagePayload')));
			// Remove old from import
			const old = specs.find((s) => s.imported.name === 'APIMessage');
			if (old) specs.splice(specs.indexOf(old), 1);
		});
	// Create import
	if (!imports.size()) {
		root
			.find(j.ImportDeclaration)
			.at(0)
			.forEach((path) =>
				path.insertAfter(j.importDeclaration([j.importSpecifier(j.identifier('styled'))], j.literal('discord.js'))),
			);
	}

	return root.toSource(printOptions);
};

module.exports.parser = parser;
