import { AxiosInstance } from "axios";
import { Product } from "../../domain/entities/product";
import { ProductGateway } from "../../domain/gateways/product.gateway";

export class ProductHttpGateway implements ProductGateway {
    constructor(private http: AxiosInstance) {}

    findAll(): Promise<Product[]> {
        return this.http.get<Product[]>('/products').then(
            (response) =>
                response.data.map(data => new Product(
                {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    price: data.price
                }))
        );
    }

    findById(id: number): Promise<Product> {
        return this.http.get<Product>(`/products/${id}`).then((response) => {
            return new Product(
                {
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price
                })
        });
    }
}