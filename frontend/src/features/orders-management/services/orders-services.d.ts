import { Order } from "../models/order";

export interface CreateOrderRequestPayload extends Omit<Order, "id" | "status" | "createAt" | "planId"> {}

export interface UpdateOrderRequestPayload extends Omit<Order, "id" | "createAt", "planId"> {}