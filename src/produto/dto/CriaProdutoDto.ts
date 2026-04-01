import { IsArray, IsNotEmpty, MinLength, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO } from "./CaracteristicaProdutoDto";
import { ImagemProdutoDTO } from "./ImagemProdutoDto";
import { Type } from "class-transformer";

export class CriaProdutoDTO {
  
  @IsNotEmpty({message: 'O nome não pode ser vazio.'})
  nome: string;

  valor: number;
  
  quantidade: number;

  @MinLength(20, {message: 'A descricao deve ter ao minimo 6 caracteres.'})
  descricao: string;
  
  @ValidateNested()
  @IsArray() 
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];
  
  @ValidateNested()
  @IsArray() 
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];
  categoria: string;
}