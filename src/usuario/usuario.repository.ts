import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository{

    private usuarios: Usuario[] = [];

    async salvar(usuario){
        this.usuarios.push(usuario);
    }

        async listar(){
        return this.usuarios;
        //console.log(this.usuarios);
    }

}

type Usuario = {
    nomne: string,
    email: string,
    senha: string
}