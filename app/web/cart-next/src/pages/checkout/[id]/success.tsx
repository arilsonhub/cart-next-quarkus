import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { GetOrderUseCase } from "../../../core/application/order/getOrderUseCase";
import { Order } from "../../../core/domain/entities/order";
import { container, Registry } from "../../../core/infra/containerRegistry";

type CheckoutSuccessPageProps = {
    order: Order
};

export const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({order}) => {
    return (
        <div>
            <h3>Parabéns sua compra foi efetivada</h3>
            <ul>
                {order.products.map((product) => (
                    <li key={product.id}>
                        Produto {product.name} - {product.price} 
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckoutSuccessPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};

export const getStaticProps : GetStaticProps = async (context) => {
    const {id} = context.params || {};
    const getOrderUseCase = container.get<GetOrderUseCase>(Registry.GetOrderUseCase);
    const order = await getOrderUseCase.execute(+id!);
    return {
        props: {
            order: order.toJSON()
        }
    };
}