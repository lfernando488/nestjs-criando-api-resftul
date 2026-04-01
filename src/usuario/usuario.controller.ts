
import { AtualizaUsuario } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.Dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uudi} from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  
    constructor(private usuarioRepository: UsuarioRepository){

    }

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
        
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uudi();

        this.usuarioRepository.salvar(usuarioEntity);
        return {
            usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuário criado com sucesso!'
        };
    }

    @Get()
    async listarUsuario(){
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        
        return usuariosLista; 
    }

    @Put('/:id')
    async autalizaUsuario(@Param('id') id: string, @Body() novosDadosUsuario: AtualizaUsuario){
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDadosUsuario);
        return{
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async removerusuario(@Param('id') id: string){
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return{
            usuario: usuarioRemovido,
            message: 'Usuário removido com sucesso.'
        }
    }

}
