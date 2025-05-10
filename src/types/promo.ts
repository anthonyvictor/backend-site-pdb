export interface IPromo {
  id: string;
  nome: string;
  ativa: boolean;
  visivel: boolean;
  dias: (string | Date)[];
  modal?: {
    imagemUrl?: string;
    route?: string;
  };
  taxaMaquininha: boolean;
}
