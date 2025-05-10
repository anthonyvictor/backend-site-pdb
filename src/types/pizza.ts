export interface IPizzaGrupo {
  id: string;
  nome: string;
  sabores?: Array<IPizzaSabor>;
}

export interface IPizzaSabor {
  id: string;
  nome: string;
  disponivel: boolean;
  grupoId: string;
  ingredientes: Array<string>;
  valores: Array<IPizzaSaborValor>;
  uuid?: string;
}
export interface IPizzaTamanho {
  id: string;
  nome: string;
  fatias: number;
  tamanhoAprox: number;
  aPartir: number;
  maxSabores: number;
  visivel: boolean;
  ativado: boolean;
  uuid?: string;
}
export interface IPizzaSaborValor {
  tamanhoId: string;
  valor: number;
}
