import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico-validator";

export class AtualizaUsuario {
    
    @IsNotEmpty({message: 'O nome não pode ser vazio.'})
    @IsOptional()
    nome: string;
    
    @IsEmail(undefined, {message: 'O email informado é inválido.'})
    @EmailEhUnico({message: 'Já existe um usuário com este email.'})
    @IsOptional()
    email: string;
    
    @MinLength(6, {message: 'A senha deve ter ao minimo 6 caracteres.'})
    @IsOptional()
    senha: string;

}