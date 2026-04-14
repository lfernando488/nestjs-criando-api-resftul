import { ProdutoRepository } from './../produto/produto.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  )
  {}

  private async buscaUsuario(id){
    const usuario = await this.usuarioRepository.findOneBy({id});
    
    if(usuario === null)
      throw new NotFoundException("Usuário não encontrado.")
    else
      return usuario;
  }

  async cadastraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
    
    const usuario = await this.buscaUsuario(usuarioId );

    const produtosIds = dadosDoPedido.itensPedido.map((itemPedido) => itemPedido.produtoId)

    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) })
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario;
  
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)
      const itemPedidoEntity = new ItemPedidoEntity();
      
       if(produtoRelacionado === undefined)
          throw new NotFoundException (`O produto ID: ${itemPedido.produtoId} não foi encontrado.`);

      itemPedidoEntity.produto = produtoRelacionado
      itemPedidoEntity.precoVenda = produtoRelacionado.valor
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade
      return itemPedidoEntity
    })

    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade
    }, 0);

    pedidoEntity.itensPedido = itensPedidoEntidades

    pedidoEntity.valorTotal = valorTotal

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)
    return pedidoCriado
  }

    async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDto){
    const pedido = await this.pedidoRepository.findOneBy({id});

    if(pedido === null){
      throw new NotFoundException(`Pedido ID:${id} não encontrado.`);
    }
    else{
      Object.assign(pedido, dto);
      return this.pedidoRepository.save(pedido);
    }
  }

}
