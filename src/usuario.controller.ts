import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/usuarios')
export class UsuarioController {
  
    private UsuarioRepository  = new UsuarioRepository();

    @Post()
    async criaUsuario(@Body() dadosDoUsuario) {
        this.UsuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    @Get()
    async listarUsuario(){
        return this.UsuarioRepository.listar();
    }
}
