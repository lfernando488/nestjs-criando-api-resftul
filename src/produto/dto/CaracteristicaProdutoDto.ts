import { IsEmpty } from "class-validator";

export class CaracteristicaProdutoDTO{
    
    @IsEmpty()
    nome: string;
    
    @IsEmpty()
    descricao: string;
}