import { CriaUsuarioDto } from './dto/CriaUsuario.Dto';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/usuarios')
export class UsuarioController {
  
    constructor(private usuarioRepository: UsuarioRepository){

    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    @Get()
    async listarUsuario(){
        return this.usuarioRepository.listar();
    }
}
