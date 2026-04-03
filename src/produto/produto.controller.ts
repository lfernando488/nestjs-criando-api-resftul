import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uudi} from 'uuid';
import { ListaProdutoDTO } from "./dto/ListaProdutoDto";
import { ProdutoService } from "./produto.service";

@Controller('/produtos')
export class ProdutoController{

    constructor(
        private readonly produtoRepository: ProdutoRepository,
        private readonly produtoService : ProdutoService
    )
    
        {}

    @Post()
    async criaUsuario(@Body() dadosDoproduto: CriaProdutoDTO) {
        
        const produtoEntity = new ProdutoEntity();    

        produtoEntity.usuarioId = dadosDoproduto.usuarioId;
        produtoEntity.id = uudi();       
        produtoEntity.nome =  dadosDoproduto.nome;
        produtoEntity.valor = dadosDoproduto.valor;
        produtoEntity.quantidadeDisponivel =  dadosDoproduto.quantidadeDisponivel;
        produtoEntity.descricao =  dadosDoproduto.descricao;
        //produtoEntity.caracteristicas = dadosDoproduto.caracteristicas; 
        //produtoEntity.imagens = dadosDoproduto.imagens;
        produtoEntity.categoria =  dadosDoproduto.categoria;
        produtoEntity.createdAt = new Date().toLocaleString('pt-BR');
        produtoEntity.updatedAt = produtoEntity.createdAt;

        this.produtoService.criaProduto(produtoEntity);
        return {
            produto: new ListaProdutoDTO(
                produtoEntity.id, produtoEntity.nome, produtoEntity.quantidadeDisponivel,
                produtoEntity.descricao, produtoEntity.categoria, produtoEntity.updatedAt
            ),
            message: 'Produto criado com sucesso!'
        };
    }

}