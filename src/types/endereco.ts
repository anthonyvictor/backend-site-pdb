export interface IEndereco {
	id: string;
	cep: string;
	rua: string;
	bairroId: string;
	taxa: number;
}

export interface IBairro {
	id: string;
	nome: string;
}
