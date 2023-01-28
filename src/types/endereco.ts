export interface IEndereco {
	id: number;
	cep: string;
	rua: string;
	bairro: IBairro;
	taxa: number;
}

export interface IBairro {
	id: number;
	nome: string;
}
