import { Controller } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";


@Controller('/produtos')
export class ProdutoController{

    constructor(private produtoRepository: ProdutoRepository){

    }

}