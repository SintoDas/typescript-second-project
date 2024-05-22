import { Product } from './product.interface';
import { ProductModel } from './product.model';

const productCreateIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getallProduct = async () => {
  const result = await ProductModel.find();
  return result;
};

export const ProductServices = {
  productCreateIntoDB,
  getallProduct,
};
