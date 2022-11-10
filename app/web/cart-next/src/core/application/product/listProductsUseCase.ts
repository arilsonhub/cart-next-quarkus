import { Product } from "../../../utils/models";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ListProductsUseCase {
    constructor(private productGateway: ProductGateway) {}

    async execute(): Promise<Product[]> {
        return await this.productGateway.findAll();
    }
}