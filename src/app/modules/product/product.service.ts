import { Product } from './product.interface';
import { ProductModel } from './product.model';
import { ObjectId } from 'mongodb'; // Import ObjectId class from 'mongodb' package
const productCreateIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getallProduct = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await ProductModel.findOne({ _id: new ObjectId(id) }); // Use ObjectId with the provided ID
  return result;
};
export const ProductServices = {
  productCreateIntoDB,
  getallProduct,
  getSingleProduct,
};
