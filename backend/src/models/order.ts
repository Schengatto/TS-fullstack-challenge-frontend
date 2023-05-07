/**
 * Order Placed: This means that Amazon has received your order and is preparing to process it.
 * Order Confirmed: This means that Amazon has received your order and is verifying the payment and shipping details.
 * Preparing for Shipment: This means that Amazon has processed your order and is preparing to ship it.
 * Shipped: This means that Amazon has shipped your order and it is on its way to the shipping address.
 * Out for Delivery: This means that the order is on its way to the shipping address and will be delivered soon.
 * Delivered: This means that the order has been delivered to the shipping address.
 * Arriving Today: This means that the order is scheduled to arrive on the same day.
 * Delayed: This means that there is a delay in the shipment or delivery of the order.
 * Cancelled: This means that the order has been cancelled either by the customer or by Amazon.
 */
import { Package } from "./package";

export enum OrderStatus {
    OrderPlaced = "ORDER_PLACED",
    PreparingForShipment = "PREPARING_FOR_SHIPMENT",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Delayed = "DELAYED",
    Cancelled = "CANCELLED",
}

export interface Order {
    id: string;
    packages: Package[];
    status: OrderStatus;
    invoiceId: string;
    createAt: Date;
    notes?: string;
    planId?: string;
}

export interface CreateOrderParams extends Omit<Order, "id" | "status" | "createAt" | "planId"> {}

export interface UpdateOrderParams extends Omit<Order, "status" | "createAt" | "planId"> {}