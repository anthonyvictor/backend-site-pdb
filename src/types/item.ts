export interface IItem {
  id?: string;
  observacao?: string;
  imagemUrl?: string;
  nome?: string;
  tipo: "pizza" | "bebida" | "outro";
  tamanho?: string;
  comboId?: string;
  sabores?: Array<{ nome: string; ingredientes: string[] }>;
  valor: number;
  promoId?: string;
}
