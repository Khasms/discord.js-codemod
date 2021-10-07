const { parse } = require('@typescript-eslint/typescript-estree');

function constructName(obj) {
	const name = [];
	let mut = obj;
	while (!mut.name) {
		if (mut.property) {
			name.push(mut.property.name);
			mut = mut.object;
		}
	}
	name.push(mut.name);
	return name.reverse().join('.');
}

const parser = {
	parse: (source) => {
		return parse(source, { range: true, loc: true });
	},
};

module.exports = { constructName, parser };
