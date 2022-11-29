import { CategoryClass } from './mockClasses/category';
import { AdminRole, RoleClass, UserRole } from "./mockClasses/role";
import { UserClass, UserWithAdminRole } from "./mockClasses/user";
import { ProductClass } from "./mockClasses/product";
import { CreateOrderItemClass, RandomOrderItem } from "./mockClasses/orderItem";
import { CanceledStatus, ProcessingStatus, StatusClass } from "./mockClasses/status";
import { Status } from "../domains/statuses/entities/status.entity";
import { User } from "../domains/users/entities/user.entity";
import { Role } from "../domains/roles/entities/role.entity";
import { Category } from "../domains/categories/entities/category.entity";
import { Product } from "../domains/products/entities/product.entity";
import { OrderItem } from "../domains/orderItems/entities/orderItem.entity";
import { CreateOrderClass, OrderClass } from './mockClasses/order';
import { Order } from '../domains/orders/entities/order.entity';
import { CreateOrderItemDto } from '../domains/orderItems/dto/createOrderItem.dto';
import { CreateOrderDto } from '../domains/orders/dto/create-order.dto';
import { Chance } from 'chance';


export class mockFactory {
    static getUser(role: string): User {
        if (role === 'admin') {
            return new UserWithAdminRole()
        } else {
            return new UserClass()
        }
    }

    static getRole(role: string): Role {
        if (role === 'admin') {
            return new AdminRole()
        } else if (role === 'user') {
            return new UserRole()
        } else {
            return new RoleClass(role)
        }
    }

    static getCategory(name?: string): Category {
        return new CategoryClass(name)
    }

    static getProduct(): Product {
        return new ProductClass()
    }

    static getStatus(value: string): Status {
        if (value === 'processing') {
            return new ProcessingStatus()
        } else if (value === 'canceled') {
            return new CanceledStatus()
        } else {
            return new StatusClass(value)
        }
    }

    static getOrderItem(order?: Order): OrderItem {
        return new RandomOrderItem(order)
    }

    static getOrder(itemsQuantity?: number): Order {
        return new OrderClass(itemsQuantity)
    }

    static getCreateOrderItemData(quantity?: number): CreateOrderItemDto {
        return new CreateOrderItemClass(quantity)
    }

    static getCreateOrderData(itemsQuantity: number): CreateOrderDto {
        return new CreateOrderClass(itemsQuantity)
    }

    static generatePhone(): string {
        return Chance().phone({ formatted: false });
    }

    static generateRandomString(length: number): string {
        return Chance().string({ length })
    }

    static generateId(): number {
        return Chance().natural({ min: 1 })
    }
}
