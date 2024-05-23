import { Order } from './order.interface';
import { OrderModel } from './order.model';

const orderCreateIntoMongoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};
const getAllOrder = async () => {
  const result = await OrderModel.find();
  return result;
};

const getAllOrderByEmail = async (userEmail: string) => {
  const result = await OrderModel.find({ email: userEmail });
  return result;
};
export const OrderServices = {
  orderCreateIntoMongoDB,
  getAllOrder,
  getAllOrderByEmail,
};
