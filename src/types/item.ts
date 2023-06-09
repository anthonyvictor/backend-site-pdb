export interface IItem {
  id?: string;
  observacao?: string;
  tamanho?: string;
  sabores?: Array<{ nome: string; ingredientes: string[] }>;
  valor: number;
}
