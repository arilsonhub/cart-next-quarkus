package org.cart.next.Dao;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.cart.next.Entities.Produto;
import org.cart.next.Repositories.ProdutoRepository;

@Named("ProdutoDaoJpa")
@ApplicationScoped
public class ProdutoDaoJpa implements ProdutoRepository {

    @Inject
    private EntityManager entityManager;
    
    public List<Produto> obterProdutos()
    {
        Query query = this.entityManager.createQuery("select obj from Produto obj");
        return query.getResultList();
    }

    public Produto obterProdutoPeloId(Long id)
    {
        Produto produto = this.entityManager.find(Produto.class, id);
        return produto;
    }
}
