import { Chance } from "chance"
import { CreateOrderItemDto } from "../../domains/orderItems/dto/createOrderItem.dto"
import { OrderItem } from "../../domains/orderItems/entities/orderItem.entity"
import { Order } from "../../domains/orders/entities/order.entity"
import { mockFactory } from "../mockFactory"

export class RandomOrderItem implements OrderItem {
    order: Order
    id = Chance().natural({ min: 1 })
    quantity = Chance().natural({ min: 1, max: 10 })
    product = mockFactory.getProduct()

    constructor(order?: Order) {
        if (order) {
            this.order = order
        } else {
            this.order = mockFactory.getOrder()
        }

        this.order.orderItems = [...this.order.orderItems, this]
    }
}

export class CreateOrderItemClass implements CreateOrderItemDto {
    product = mockFactory.getProduct()
    quantity: number

    constructor(quantity?: number) {
        this.quantity = quantity || Chance().natural({ min: 1, max: 10 })
    }
}
