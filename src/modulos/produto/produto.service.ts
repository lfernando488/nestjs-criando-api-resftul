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
        Object.assign(produtoEntity, dadosProduto as ProdutoEntity);
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

    async listaUmProduto(id: string) {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: {
                imagens: true,
                caracteristicas: true,
            },
        });

        if(!produto){
            throw new Error("Produto não encontrado!");
        }

        return new ListaProdutoDTO(
            produto.id,
            produto.nome,
            produto.caracteristicas,
            produto.imagens,
        );
    }

    async deletaProduto(id: string){
        await this.produtoRepository.delete(id);
    }

}