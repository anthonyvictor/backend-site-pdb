export interface IPizzaGrupo {
	nome: string;
	sabores: Array<IPizzaSabor>;
}
export interface IPizzaSabor {
	nome: string;
	disponivel: boolean;
	ingredientes: Array<string>;
	valores: Array<IPizzaSaborValor>;
}
export interface IPizzaTamanho {
	nome: string;
	fatias: number;
	tamanhoAprox: number;
	maxSabores: number;
	visivel: boolean;
}
export interface IPizzaSaborValor {
	tamanho: string;
	valor: number;
}
