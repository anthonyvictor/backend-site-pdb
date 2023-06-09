interface IPizzaGrupo {
  id: string;
  nome: string;
  sabores?: Array<IPizzaSabor>;
}
interface IPizzaSabor {
  id: string;
  nome: string;
  disponivel: boolean;
  grupoId: string;
  ingredientes: Array<string>;
  valores: Array<IPizzaSaborValor>;
}
interface IPizzaTamanho {
  id: string;
  nome: string;
  fatias: number;
  tamanhoAprox: number;
  maxSabores: number;
  visivel: boolean;
}
interface IPizzaSaborValor {
  tamanhoId: string;
  valor: number;
}
