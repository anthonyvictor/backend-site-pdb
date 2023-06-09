import { Service } from ".";
import { Repo } from "../repositories";
import { min } from "date-fns";
import { IPedidosGetDTO } from "../dtos/pedidos/get";
import { z } from "zod";
const createPedidoSchema = z.object({
  cliente: z.object({
    nome: z
      .string({ required_error: "O nome do cliente é obrigatório." })
      .min(2, "O nome do cliente deve ter no mínimo 2 caracteres."),
    whatsapp: z
      .string({ required_error: "O whatsapp do cliente é obrigatório." })
      .min(8, "Um número de telefone válido contém no mínimo 8 caracteres."),
  }),
  tipo: z.enum(["retirada", "entrega"], {
    required_error: 'O tipo do pedido deve ser "retirada" ou "entrega"',
  }),
  itens: z
    .object({
      id: z.string(),
      tamanho: z.string().nullable().optional(),
      sabores: z
        .object({
          nome: z.string(),
          ingredientes: z.string().array(),
        })
        .array()
        .optional(),
      observacoes: z.string().nullable().optional(),
      valor: z.number(),
    })
    .array(),
  pagamento: z
    .object({
      id: z.string(),
      tipo: z.enum(["especie", "cartao", "pix"]),
      valor: z.number(),
      trocoPara: z.number(),
    })
    .array(),
  historico: z
    .object({
      tipo: z.enum([
        "enviado",
        "recebido",
        "alterado",
        "aceito",
        "cancelado",
        "finalizado",
        "pronto",
      ]),
      data: z.string().transform((str) => new Date(str)),
    })
    .array(),
  endereco: z
    .object({
      cep: z.string(),
      bairro: z.string(),
      local: z.string(),
      numero: z.string(),
      referencia: z.string(),
      taxa: z.number(),
    })
    .nullable()
    .optional(),
});
export class PedidosService extends Service<IPedido> {
  constructor(repo: Repo<IPedido>) {
    super(repo);
  }

  sortByRecents = (a: IPedido, b: IPedido) => {
    let i = 0;

    const dataInicialA = min(
      a.historico.filter((x) => x.tipo === "enviado").map((x) => x.data)
    );
    const dataInicialB = min(
      b.historico.filter((x) => x.tipo === "enviado").map((x) => x.data)
    );

    return dataInicialA > dataInicialB ? -1 : 1;
  };

  async find(dto: IPedidosGetDTO): Promise<IPedido[]> {
    const data = ((await this.repo.find(dto)) as IPedido[]).sort(
      this.sortByRecents
    );
    return data;
  }

  async create(item: IPedido) {
    createPedidoSchema.parse(item);
    console.log(item);
    return await this.repo.create({ ...item });
  }
  async update(itemId: string, item: IPedido) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
