import { CheckoutOrderDto } from './CheckoutOrder.dto';

export interface CheckoutUpdateOrderDto extends CheckoutOrderDto {
    status: string;
}
