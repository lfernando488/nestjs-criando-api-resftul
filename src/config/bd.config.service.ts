import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { PedidoEntity } from "src/modulos/pedido/pedido.entity";
import { ProdutoCaracteristicaEntity } from "src/modulos/produto/produto-caracteristica.entity";
import { ProdutoImagemEntity } from "src/modulos/produto/produto-imagem.entity";
import { ProdutoEntity } from "src/modulos/produto/produto.entity";
import { UsuarioEntity } from "src/modulos/usuario/usuario.entity";

@Injectable()
export class BdConfigService implements TypeOrmOptionsFactory{
    
    constructor(private configService: ConfigService)
    {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
 
        return {
            type: 'postgres',
            host: this.configService.get<string>('BD_HOST'),
            port: this.configService.get<number>('BD_PORT'),
            username: this.configService.get<string>('BD_USER'),
            password: this.configService.get<string>('BD_PASSWORD'),
            database: this.configService.get<string>('BD_NAME'),
            entities: [__dirname + '/**/*.entity{.js, .ts}'],
            //entities: [UsuarioEntity, ProdutoEntity,ProdutoImagemEntity, ProdutoCaracteristicaEntity, PedidoEntity],
            autoLoadEntities: true,
            //synchronize: true,
            //logging: true //mostar o SQL gerado
        }
    }

}