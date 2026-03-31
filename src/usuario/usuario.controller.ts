import { CriaUsuarioDto } from './dto/CriaUsuario.Dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uudi} from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  
    constructor(private usuarioRepository: UsuarioRepository){

    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
        
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uudi();

        this.usuarioRepository.salvar(usuarioEntity);
        return {id: usuarioEntity.id, message: 'Usuário criado com sucesso!' };
    }

    @Get()
    async listarUsuario(){
        return this.usuarioRepository.listar();
    }
}
