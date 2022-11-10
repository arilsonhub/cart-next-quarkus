package org.cart.next.Dao;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.cart.next.Entities.Pedido;
import org.cart.next.Repositories.PedidoRepository;

@ApplicationScoped
@Named("PedidoDaoJpa")
public class PedidoDaoJpa implements PedidoRepository {
    
    @Inject
    private EntityManager entityManager;

    public List<Pedido> obterPedidos()
    {
        Query query = this.entityManager.createQuery("select obj from Pedido obj");
        List<Pedido> listaPedidos = query.getResultList();
        return listaPedidos;
    }

    public Pedido obterPedidoPeloId(Long id)
    {
        Pedido pedido = this.entityManager.find(Pedido.class, id);
        return pedido;
    }

    public void salvarPedido(Pedido pedido)
    {
        this.entityManager.persist(pedido);
    }
}
