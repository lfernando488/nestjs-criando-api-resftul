export class UsuarioRepository{

    private usuarios: Usuario[] = [];

    async salvar(usuario){
        this.usuarios.push(usuario);
        //console.log(this.usuarios);
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