export function removeAccents(txt: string) {
	return String(txt)
		.replace(/[ÀÁÂÃÄÅ]/gi, "A")
		.replace(/[Ç]/gi, "C")
		.replace(/[ÈÉÊË]/gi, "E")
		.replace(/[ÌÍÎÏ]/gi, "I")
		.replace(/[ÒÓÔÕÖ]/gi, "O")
		.replace(/[ÙÚÛÜ]/gi, "U")

		.replace(/[àáâãäå]/gi, "a")
		.replace(/[ç]/gi, "c")
		.replace(/[èéêë]/gi, "e")
		.replace(/[ìíîï]/gi, "i")
		.replace(/[òóôõö]/gi, "o")
		.replace(/[ùúûü]/gi, "u")
		.trim();
}

export function removeAbreviations(txt: string) {
	return txt
		.replace(/^r /, "rua ")
		.replace(/^acesso /, "")
		.replace(/^lad /, "ladeira ")
		.replace(/^tv /, "travessa ")
		.replace(/^trav /, "travessa ")
		.replace(/^av /g, "avenida ")
		.replace(/^pc /g, "praça ")
		.replace(/^pç /g, "praça ")
		.replace(/(. +)(st +)/g, "$1 santo ")
		.replace(/(. +)(dr +)/g, "$1 doutor ")
		.replace(/(. +)(dra +)/g, "$1 doutora ");
}

export function convertOrdinals(txt: string) {
	[
		"primeira",
		"segunda",
		"terceira",
		"quarta",
		"quinta",
		"sexta",
		"setima",
		"oitava",
		"nona",
	].forEach((x, i) => {
		const regex = new RegExp(String.raw`^(${i + 1}a|${i + 1}|${x}) `, "g");
		txt = txt.replace(regex, `${i + 1}ª `);
	});
	return txt;
}
