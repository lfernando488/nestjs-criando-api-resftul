export class ListaProdutoDTO{

    constructor(
        readonly id: string, readonly nome: string,
        readonly quantidadeDisponivel: number, readonly descricao: string,
        readonly categoria: string, readonly dataCriacao: string
    )
    {}

}