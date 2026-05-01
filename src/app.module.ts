import { Module } from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BdConfigService } from './config/bd.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UsuarioModule, 
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: BdConfigService,
      inject: [BdConfigService],
    }),
    PedidoModule,
    CacheModule.register({ isGlobal: true,  ttl: 10000}) //Cache nativo do NestJs
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal
    }
  ],
})
export class AppModule {}
