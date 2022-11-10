package org.cart.next.Controllers;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.cart.next.Entities.Pedido;
import org.cart.next.Repositories.PedidoRepository;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("orders")
public class PedidoController {

    @Inject
    @Named("PedidoDaoJpa")
    private PedidoRepository pedidoRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Pedido> listarPedidos()
    {
        List<Pedido> listaPedidos = this.pedidoRepository.obterPedidos();
        return listaPedidos;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Pedido obterPedidoPeloId(@PathParam Long id)
    {
        Pedido pedido = this.pedidoRepository.obterPedidoPeloId(id);
        return pedido;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Pedido salvarPedido(Pedido pedido)
    {
        this.pedidoRepository.salvarPedido(pedido);
        return pedido;
    }
}
