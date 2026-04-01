import { IsNotEmpty } from "class-validator";

export class CaracteristicaProdutoDTO{
    
    @IsNotEmpty({message: "O nome de uma caracteristica de produto nao pode ser vazio."})
    nome: string;
    
    @IsNotEmpty({message: "A descrição de uma caracteristica de produto nao pode ser vazia."})
    descricao: string;
}