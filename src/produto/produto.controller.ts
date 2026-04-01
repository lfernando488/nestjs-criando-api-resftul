import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uudi} from 'uuid';
import { ListaProdutoDTO } from "./dto/ListaProdutoDto";

@Controller('/produtos')
export class ProdutoController{

    constructor(private produtoRepository: ProdutoRepository){

    }

    @Post()
    async criaUsuario(@Body() dadosDoproduto: CriaProdutoDTO, @Body() usuarioId: string) {
        
        const produtoEntity = new ProdutoEntity();

        produtoEntity.id = uudi();
        produtoEntity.usuarioId = usuarioId;  
        produtoEntity.nome =  dadosDoproduto.nome;
        produtoEntity.quantidadeDisponivel =  dadosDoproduto.quantidade;
        produtoEntity.descricao =  dadosDoproduto.descricao;
        produtoEntity.caracteristicas = dadosDoproduto.caracteristicas; 
        produtoEntity.imagens = dadosDoproduto.imagens;
        produtoEntity.categoria =  dadosDoproduto.categoria;
        produtoEntity.dataCriacao = new Date();
        produtoEntity.dataAtualizacao = produtoEntity.dataCriacao;

        this.produtoRepository.salvar(produtoEntity);
        return {
            usuario: new ListaProdutoDTO(
                produtoEntity.id, produtoEntity.nome, produtoEntity.quantidadeDisponivel,
                produtoEntity.descricao, produtoEntity.categoria, produtoEntity.dataCriacao
            ),
            message: 'Produto criado com sucesso!'
        };
    }

}