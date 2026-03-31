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

    async existeComEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );
        return possivelUsuario !== undefined;
    }

}

type Usuario = {
    nomne: string,
    email: string,
    senha: string
}