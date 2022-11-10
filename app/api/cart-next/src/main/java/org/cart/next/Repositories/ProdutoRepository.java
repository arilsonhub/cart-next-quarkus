package org.cart.next.Repositories;

import java.util.List;

import org.cart.next.Entities.Produto;

public interface ProdutoRepository {
    
    public List<Produto> obterProdutos();

    public Produto obterProdutoPeloId(Long id);
}
