import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { ProdutoEntity } from "../produto.entity";

export class ImagemProdutoDTO{
    
    @IsOptional()
    id: string;

    @IsNotEmpty({message: 'A Url da imagem é obrigatória.'})
    @IsUrl()
    url: string;

    @IsNotEmpty({message: 'A Descrição da imagem é obrigatória.'})
    @IsString()
    descricao: string;

    @IsOptional()
    produto: ProdutoEntity;
}