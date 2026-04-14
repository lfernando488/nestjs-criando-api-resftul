import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProdutoDto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService{

    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ){}

    async criaProduto(dadosProduto: CriaProdutoDTO) {
        const produtoEntity = new ProdutoEntity();

        produtoEntity.nome = dadosProduto.nome;
        produtoEntity.valor = dadosProduto.valor;
        produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
        produtoEntity.descricao = dadosProduto.descricao;
        produtoEntity.categoria = dadosProduto.categoria;
        produtoEntity.caracteristicas = dadosProduto.caracteristicas;
        produtoEntity.imagens = dadosProduto.imagens;

        return this.produtoRepository.save(produtoEntity);
    }

    async atualizaProduto(id:string, novosDados:AtualizaProdutoDTO){
        const entityName = await this.produtoRepository.findOneBy({id});
        
        if(entityName !== null)
            Object.assign(entityName, novosDados);
        else
            throw new NotFoundException ("Produto não encontrado");

        await this.produtoRepository.save(entityName);
    }

    async listProdutos() {
        const produtosSalvos = await this.produtoRepository.find({
        relations: {
            imagens: true,
            caracteristicas: true,
        },
        });
    
        const produtosLista = produtosSalvos.map(
        (produto) => new ListaProdutoDTO(
            produto.id,
            produto.nome,
            produto.caracteristicas,
            produto.imagens,
        ),
        );
        return produtosLista;
    }

    async deletaProduto(id: string){
        await this.produtoRepository.delete(id);
    }

}