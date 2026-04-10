import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/email-eh-unico-validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";
import { PedidoEntity } from "../pedido/pedido.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, PedidoEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEhUnicoValidator, UsuarioService],
    exports: [UsuarioRepository]
})
export class UsuarioModule{
    
}