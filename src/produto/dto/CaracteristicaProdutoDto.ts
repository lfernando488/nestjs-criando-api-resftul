import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProdutoEntity } from "../produto.entity";

export class CaracteristicaProdutoDTO{

    @IsOptional()
    id: string;

    @IsNotEmpty({message: "O nome de uma caracteristica de produto nao pode ser vazio."})
    @IsString()
    
    nome: string;
    
    @IsNotEmpty({message: "A descrição de uma caracteristica de produto nao pode ser vazia."})
    @IsString()
    descricao: string;

    @IsOptional()
    produto: ProdutoEntity;
}