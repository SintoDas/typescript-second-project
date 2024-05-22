import { Product } from './product.interface';
import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const result = await ProductServices.productCreateIntoDB(productData);
    res.status(200).json({
      succuss: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getallProduct();
    res.status(200).json({
      succuss: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const ProductController = {
  createProduct,
  getAllProduct,
};
