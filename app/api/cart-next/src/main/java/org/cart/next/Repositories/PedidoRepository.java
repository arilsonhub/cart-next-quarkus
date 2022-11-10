package org.cart.next.Repositories;

import java.util.List;
import org.cart.next.Entities.Pedido;

public interface PedidoRepository {

    public List<Pedido> obterPedidos();
    
    public Pedido obterPedidoPeloId(Long id);

    public void salvarPedido(Pedido pedido);
}
