import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import { CartContext } from "../../context/cart.provider";
import Link from 'next/link';
import { container, Registry } from "../../core/infra/containerRegistry";
import { ProcessOrderUseCase } from "../../core/application/order/processOrderUseCase";

type Props = {};
export const CheckoutPage : NextPage = (props: Props) => {
    const cartContext = useContext(CartContext);
    const router = useRouter();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const creditCardNumber = event.currentTarget.credit_card_number.value;
        const processOrderUseCase = container.get<ProcessOrderUseCase>(Registry.ProcessOrderUseCase);
        const order = await processOrderUseCase.execute({
            products: cartContext.cart.products,
            credit_card_number: creditCardNumber
        });
        cartContext.reload();
        router.push(`/checkout/${order.id}/success`);
    }

    return (
        <div>
            <h3>Meu carrinho</h3>
            <ul>
                {cartContext.cart.products.map((product) => (
                    <li key={product.id}>
                        Produto {product.name} - {product.price}
                    </li>
                ))}
            </ul> 
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="">Cartão de crédito</label>&nbsp;&nbsp;
                    <input type="text" name="credit_card_number" id="credit_card_number" /><br /><br />
                    <button>Comprar</button>&nbsp;&nbsp;
                    <Link href={`/`} passHref>
                        <button>
                            <a href="">Voltar</a>
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;