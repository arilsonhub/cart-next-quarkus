package org.cart.next.Controllers;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.cart.next.Entities.Produto;
import org.cart.next.Repositories.ProdutoRepository;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("products")
public class ProdutoController {

    @Inject
    @Named("ProdutoDaoJpa")
    private ProdutoRepository produtoRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Produto> obterListaProdutos()
    {
        List<Produto> listaProdutos = produtoRepository.obterProdutos();
        return listaProdutos;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Produto obterProdutoPeloId(@PathParam Long id)
    {
        Produto produto = produtoRepository.obterProdutoPeloId(id);
        return produto;
    }
}