import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.provider';
import { GetProductUseCase } from '../../core/application/product/getProductUseCase';
import { Product, ProductProps } from '../../core/domain/entities/product';
import { container, Registry } from '../../core/infra/containerRegistry';

type ProductDetailPageProps = {
    product: ProductProps
};

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({product}) => {
    const productEntity = new Product({...product});
    const cartContext = useContext(CartContext);
    return (
        <div>
            <h3>{productEntity.name}</h3>
            <label>Preço</label><span>&nbsp;{productEntity.price}</span><br /><br />
            <button onClick={() => cartContext.addProduct(productEntity)}>Adicionar no carrinho</button><br /><br />
            <Link href={'/'} passHref>
              <button>Voltar</button>
            </Link>
        </div>
    );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const {id} = context.params || {};
    const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
    const product = await useCase.execute(+id!);
    return {
        props: {
            product: product.toJSON()
        }
    };
};