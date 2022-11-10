import "reflect-metadata";
import { Container } from "inversify";
import { AddProductInCartUseCase } from "../application/cart/addProductInCartUseCase";
import { ClearCartUseCase } from "../application/cart/clearCartUseCase";
import { GetCartUseCase } from "../application/cart/getCartUseCase";
import { RemoveProductFromCartUseCase } from "../application/cart/removeProductFromCartUseCase";
import { GetProductUseCase } from "../application/product/getProductUseCase";
import { ListProductsUseCase } from "../application/product/listProductsUseCase";
import { CartLocalStorageGateway } from "./gateways/CartLocalStorageGateway";
import { ProductHttpGateway } from "./gateways/ProductHttpGateway";
import { http } from "./http";
import { OrderHttpGateway } from "./gateways/OrderHttpGateway";
import { GetOrderUseCase } from "../application/order/getOrderUseCase";
import { ProcessOrderUseCase } from "../application/order/processOrderUseCase";
import { OrderGateway } from "../domain/gateways/order.gateway";
export const container = new Container();

export const Registry = {
    AxiosAdapter: Symbol.for("AxiosAdapter"),
    ProductGateway: Symbol.for("ProductGateway"),
    CartGateway: Symbol.for("CartGateway"),
    OrderGateway: Symbol.for("OrderGateway"),
    ListProductsUseCase: Symbol.for("ListProductsUseCase"),
    GetProductUseCase: Symbol.for("GetProductUseCase"),
    GetCartUseCase: Symbol.for("GetCartUseCase"),
    AddProductInCartUseCase: Symbol.for("AddProductInCartUseCase"),
    RemoveProductFromCartUseCase: Symbol.for("RemoveProductFromCartUseCase"),
    ClearCartUseCase: Symbol.for("ClearCartUseCase"),
    GetOrderUseCase: Symbol.for("GetOrderUseCase"),
    ProcessOrderUseCase: Symbol.for("ProcessOrderUseCase")
}

//####### HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(http);

//####### Gateway
container.bind(Registry.ProductGateway).toDynamicValue((context) => {
    return new ProductHttpGateway(context.container.get(Registry.AxiosAdapter));
});

container.bind(Registry.CartGateway).to(CartLocalStorageGateway);

container.bind(Registry.OrderGateway).toDynamicValue((context) => {
    return new OrderHttpGateway(context.container.get(Registry.AxiosAdapter));
});

//####### Use Cases
container.bind(Registry.ListProductsUseCase).toDynamicValue((context) => {
    return new ListProductsUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetProductUseCase).toDynamicValue((context) => {
    return new GetProductUseCase(context.container.get(Registry.ProductGateway));
});

container.bind(Registry.GetCartUseCase).toDynamicValue((context) => {
    return new GetCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.AddProductInCartUseCase).toDynamicValue((context) => {
    return new AddProductInCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.RemoveProductFromCartUseCase).toDynamicValue((context) => {
    return new RemoveProductFromCartUseCase(context.container.get(Registry.CartGateway));
});

container.bind(Registry.ClearCartUseCase).toDynamicValue((context) => {
    return new ClearCartUseCase(context.container.get(Registry.CartGateway));
});

container
  .bind(Registry.GetOrderUseCase)
  .toDynamicValue((context) => {
    const orderGate = context.container.get<OrderGateway>(Registry.OrderGateway);
    return new GetOrderUseCase(orderGate);
  });
container.bind(Registry.ProcessOrderUseCase).toDynamicValue((context) => {
  return new ProcessOrderUseCase(
    context.container.get(Registry.OrderGateway),
    context.container.get(Registry.CartGateway)
  );
});