import { IItem } from "./item";

export interface IPedido {
  id: string;
  cliente: ICliente;
  tipo: "retirada" | "entrega";
  endereco?: {
    cep: string;
    bairro: string;
    local: string;
    numero: string;
    referencia: string;
    taxa: number;
  };
  itens: IItem[];
  posicao: number;
  previsao: Date;
  historico: IHorario[];
  pagamento: IPagamento[];
}

export interface IPagamento {
  id: string;
  tipo: "especie" | "pix" | "cartao";
  valor: number;
  trocoPara: number;
}

export interface IHorario {
  tipo:
    | "enviado"
    | "recebido"
    | "alterado"
    | "aceito"
    | "cancelado"
    | "finalizado"
    | "pronto";
  data: Date;
}
