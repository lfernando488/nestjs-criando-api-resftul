import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico-validator";
import { CriaUsuarioDTO } from "./CriaUsuario.Dto";

export class AtualizaUsuario extends CriaUsuarioDTO{
    
    //@IsNotEmpty({message: 'O nome não pode ser vazio.'})
    @IsOptional()
    declare nome: string;
    
    //@IsEmail(undefined, {message: 'O email informado é inválido.'})
    //@EmailEhUnico({message: 'Já existe um usuário com este email.'})
    @IsOptional()
    declare email: string;
    
    //@MinLength(6, {message: 'A senha deve ter ao minimo 6 caracteres.'})
    @IsOptional()
    declare senha: string;

}