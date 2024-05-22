import { Product } from './product.interface';
import { ProductModel } from './product.model';
import { ObjectId } from 'mongodb'; // Import ObjectId class from 'mongodb' package
const productCreateIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// const getallProduct = async () => {
//   const result = await ProductModel.find();
//   return result;
// };

const getallProduct = async (searchTerm?: string) => {
  let query = {}; // Default query to fetch all products

  if (searchTerm) {
    // If searchTerm is provided, construct a query to filter products by name
    query = { name: { $regex: new RegExp(searchTerm, 'i') } };
  }

  const result = await ProductModel.find(query);
  return result;
};

const getSingleProduct = async (id: string) => {
  const result = await ProductModel.findOne({ _id: new ObjectId(id) }); // Use ObjectId with the provided ID
  return result;
};

// update one product

const updateSingleProduct = async (
  id: string,
  updateData: Partial<Product>,
) => {
  // Use ObjectId with the provided ID
  const result = await ProductModel.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData },
  );
  return result;
};

// delete a document

const deleteSingleProduct = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: new ObjectId(id) });
  return result;
};
// search document

export const ProductServices = {
  productCreateIntoDB,
  getallProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
