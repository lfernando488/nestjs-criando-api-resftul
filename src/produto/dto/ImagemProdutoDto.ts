import { IsEmpty } from "class-validator";

export class ImagemProdutoDTO{
    
    @IsEmpty({message: 'A Url da imagem é obrigatória.'})
    url: string;

    @IsEmpty({message: 'A Descrição da imagem é obrigatória.'})
    descricao: string;
}