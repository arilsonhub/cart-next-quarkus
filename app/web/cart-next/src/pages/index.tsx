import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { ListProductsUseCase } from '../core/application/product/listProductsUseCase'
import { ProductProps } from '../core/domain/entities/product'
import { container, Registry } from '../core/infra/containerRegistry'

type HomeProps = {
  products: ProductProps[]
}

const Home: NextPage<HomeProps> = ({products}) => {
  return (
    <div>
      <h1>Ecommerce cart-next</h1>
      <Link href={`/checkout`} passHref>
        <button>
          <a href="">Checkout</a>
        </button>
      </Link>
      <ul>
        {products.map((product, key) => (
          <li key={key}> 
            <label>Nome:</label><span>&nbsp;{product.name}</span><span>&nbsp;|&nbsp;</span>
            <Link href={`/products/${product.id}`} passHref>
              <a href="">Visualizar</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const useCase = container.get<ListProductsUseCase>(Registry.ListProductsUseCase);
  const products = await useCase.execute();

  return {
    props: {
      products: products.map((product) => product.toJSON())
    }
  }
}
