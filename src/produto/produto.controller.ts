import { ImagemProdutoDTO } from './dto/ImagemProdutoDto';
import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uudi} from 'uuid';
import { ListaProdutoDTO } from "./dto/ListaProdutoDto";
import { ProdutoService } from "./produto.service";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Controller('/produtos')
export class ProdutoController{

    constructor(
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

        produtoEntity.caracteristicas = dadosDoproduto.caracteristicas.map(c => {
            const entity = new ProdutoCaracteristicaEntity();
                entity.nome = c.nome;
                entity.descricao = c.descricao;
                entity.produto = produtoEntity
            return entity;
        });

        produtoEntity.imagens = dadosDoproduto.imagens.map(i => {
            const entity = new ProdutoImagemEntity();
            entity.url = i.url;
            entity.descricao = i.descricao;
            entity.produto = produtoEntity;
            return entity;
        });
        
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