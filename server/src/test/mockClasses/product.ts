import { Chance } from "chance";
import { Product } from "../../domains/products/entities/product.entity";
import { mockFactory } from "../mockFactory";

export class ProductClass implements Product {
    id = Chance().natural({ min: 1 })
    name = Chance().string({ length: 5 })
    description = Chance().string({ length: 15 })
    price = Chance().natural({ min: 100, max: 10000 })
    image = Chance().string({ length: 10 })
    isActive = Chance().bool()
    category = mockFactory.getCategory('pizza')
    components = []
    orderItems = []
}
