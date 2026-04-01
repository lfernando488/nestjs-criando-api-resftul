import { IsNotEmpty } from "class-validator";

export class ImagemProdutoDTO{
    
    @IsNotEmpty({message: 'A Url da imagem é obrigatória.'})
    url: string;

    @IsNotEmpty({message: 'A Descrição da imagem é obrigatória.'})
    descricao: string;
}