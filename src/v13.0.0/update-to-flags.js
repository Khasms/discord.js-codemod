const {
	ActivityFlags,
	ApplicationFlags,
	IntentsFlags,
	MessageFlags,
	PermissionFlags,
	SystemChannelFlags,
	UserFlags,
} = require('../constants');
const { parser } = require('../util');

module.exports = function transform(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const printOptions = options.printOptions;

	const flags = [
		['Permissions', PermissionFlags],
		['ActivityFlags', ActivityFlags],
		['ApplicationFlags', ApplicationFlags],
		['MessageFlags', MessageFlags],
		['SystemChannelFlags', SystemChannelFlags],
		['UserFlags', UserFlags],
		['Intents', IntentsFlags],
	];

	// Change to flags
	const found = [];
	root
		.find(j.Literal)
		.filter(({ node }) =>
			[
				...PermissionFlags,
				...ActivityFlags,
				...ApplicationFlags,
				...MessageFlags,
				...SystemChannelFlags,
				...UserFlags,
				...IntentsFlags,
			].includes(node.value),
		)
		.replaceWith(({ node }) => {
			const bitfieldName = flags.find(([, value]) => value.includes(node.value)).at(0);
			found.push(bitfieldName);

			return j.memberExpression(
				j.memberExpression(j.identifier(bitfieldName), j.identifier('FLAGS')),
				j.identifier(node.value),
			);
		});

	if (found.includes('Permissions')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'Permissions');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('Permissions')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('Permissions'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('ActivityFlags')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'ActivityFlags');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('ActivityFlags')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('ActivityFlags'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('ApplicationFlags')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'ApplicationFlags');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('ApplicationFlags')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('ApplicationFlags'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('MessageFlags')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'MessageFlags');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('MessageFlags')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('MessageFlags'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('SystemChannelFlags')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'SystemChannelFlags');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('SystemChannelFlags')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('SystemChannelFlags'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('UserFlags')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'UserFlags');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('UserFlags')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(
						j.importDeclaration([j.importSpecifier(j.identifier('UserFlags'))], j.literal('discord.js')),
					),
				);
		}
	}

	if (found.includes('Intents')) {
		const imports = root
			.find(j.ImportDeclaration)
			.filter(({ node }) => node.source.value === 'discord.js')
			.forEach(({ node }) => {
				const exists = node.specifiers.find((s) => s.imported.name === 'Intents');
				if (!exists) {
					node.specifiers.push(j.importSpecifier(j.identifier('Intents')));
				}
			});
		if (!imports.size()) {
			root
				.find(j.ImportDeclaration)
				.at(0)
				.forEach((path) =>
					path.insertAfter(j.importDeclaration([j.importSpecifier(j.identifier('Intents'))], j.literal('discord.js'))),
				);
		}
	}

	return root.toSource(printOptions);
};

module.exports.parser = parser;
