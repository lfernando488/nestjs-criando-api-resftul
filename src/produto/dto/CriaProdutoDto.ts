import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, MaxLength, min, Min, MinLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProdutoDto";
import { ImagemProdutoDTO } from "./ImagemProdutoDto";
import { Type } from "class-transformer";

export class CriaProdutoDTO {
  
    @IsNotEmpty({message: 'O Id do usuário publicador do produto não pode ser vazio.'})
    usuarioId: string;

    @IsNotEmpty({message: 'O nome não pode ser vazio.'})
    nome: string;

    @IsPositive({ message: 'Valor inválido, deve ser maior que zero.' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Valor inválido' })
    valor: number;
  
    @Min(10, {message: 'A quantidade inicial deve ser a partir de 10 unidades.'})
    quantidadeDisponivel: number;

    @MinLength(20, {message: 'A descricao deve ter ao minimo 6 caracteres.'})
    @MaxLength(1000, {message: 'A descrição não deve ultrapassar 1000 caracteres.'})
    descricao: string;
  
    @ValidateNested()
    @IsArray() 
    @Type(() => CaracteristicaProdutoDTO)
    @ArrayMinSize(3, {message: 'A caracteristica do produto deve conter ao menos 3 itens.'})
    caracteristicas: CaracteristicaProdutoDTO[];
  
    @ValidateNested()
    @IsArray() 
    @Type(() => ImagemProdutoDTO)
    @ArrayMinSize(1, {message: 'O produto deve conter ao menos 1 imagem.'})
    imagens: ImagemProdutoDTO[];
    
    @IsNotEmpty({message: 'A categoria do produto não pode ser vazia.'})
    categoria: string;
}