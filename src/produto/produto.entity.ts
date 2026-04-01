export class ProdutoEntity{
    
    id: string;
    usuarioId: string;
    nome: string;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: { nome: string; descricao: string; }[]; 
    imagens:{url: string; descricao: string; }[];
    categoria: string;
    dataCriacao: Date;
    dataAtualizacao: Date;

}