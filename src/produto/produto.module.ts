import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { ProdutoImagemEntity } from "./produto-imagem.entity";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProdutoEntity, ProdutoImagemEntity, ProdutoCaracteristicaEntity])], 
    controllers: [ProdutoController],
    providers: [ProdutoRepository, ProdutoService]
})
export class ProdutoModule{
    
}