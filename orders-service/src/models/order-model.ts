import { Schema, model, Document } from 'mongoose';

export interface Order {
  userID: string;
  order_name: string;
  quantity: number;
}

export type OrderDocument = Order & Document;

const OrderSchema = new Schema<OrderDocument>(
  {
    userID: { type: String, required: true },
    order_name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const OrderModel = model<OrderDocument>('Order', OrderSchema);