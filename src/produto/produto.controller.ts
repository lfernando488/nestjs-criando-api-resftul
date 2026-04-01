import { Body, Controller, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProdutoDto";
import { ProdutoEntity } from "./produto.entity";
import { v4 as uudi} from 'uuid';
import { ListaProdutoDTO } from "./dto/ListaProdutoDto";
import { UsuarioRepository } from "src/usuario/usuario.repository";
import { Console } from "console";

@Controller('/produtos')
export class ProdutoController{

    constructor(private produtoRepository: ProdutoRepository, private usuarioRepository:UsuarioRepository){

    }

    @Post()
    async criaUsuario(@Body() dadosDoproduto: CriaProdutoDTO) {
        
        const produtoEntity = new ProdutoEntity();    
        const usuarioExiste = await this.usuarioRepository.buscaPorId(dadosDoproduto.usuarioId);

        if(!usuarioExiste){
            return {
                idUsuario: dadosDoproduto.usuarioId,
                message: 'O usuário informado não existe'
            };

        }
        else{
            produtoEntity.usuarioId = dadosDoproduto.usuarioId;
        }

        produtoEntity.id = uudi();       
        produtoEntity.nome =  dadosDoproduto.nome;
        produtoEntity.quantidadeDisponivel =  dadosDoproduto.quantidadeDisponivel;
        produtoEntity.descricao =  dadosDoproduto.descricao;
        produtoEntity.caracteristicas = dadosDoproduto.caracteristicas; 
        produtoEntity.imagens = dadosDoproduto.imagens;
        produtoEntity.categoria =  dadosDoproduto.categoria;
        produtoEntity.dataCriacao = new Date();
        produtoEntity.dataAtualizacao = produtoEntity.dataCriacao;

        //console.log(JSON.stringify(produtoEntity, null, 2));

        this.produtoRepository.salvar(produtoEntity);
        return {
            produto: new ListaProdutoDTO(
                produtoEntity.id, produtoEntity.nome, produtoEntity.quantidadeDisponivel,
                produtoEntity.descricao, produtoEntity.categoria, produtoEntity.dataCriacao
            ),
            message: 'Produto criado com sucesso!'
        };
    }

}