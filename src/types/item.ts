export interface IItem {
  id?: string;
  observacao?: string;
  nome?: string;
  tipo: "PIZZA" | "BEBIDA" | "OUTRO";
  tamanho?: string;
  comboId?: string;
  sabores?: Array<{ nome: string; ingredientes: string[] }>;
  valor: number;
}
