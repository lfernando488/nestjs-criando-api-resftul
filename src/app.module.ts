import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BdConfigService } from './bd.config.service';

@Module({
  imports: [
    UsuarioModule, 
    ProdutoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
