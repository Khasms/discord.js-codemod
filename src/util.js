const { parseAndGenerateServices } = require('@typescript-eslint/typescript-estree');

function constructName(obj) {
	const name = [];
	let mut = obj;
	while (!mut.name) {
		name.push(mut.property.name);
		mut = mut.object;
	}
	name.push(mut.name);
	return name.reverse().join('.');
}

const parser = {
	parse: (source) => {
		return parseAndGenerateServices(source, { range: true, loc: true, project: './tsconfig.eslint.json' });
	},
};

module.exports = { constructName, parser };
