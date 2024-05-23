import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { ProductJoiSchema } from './product.joi.validation';

//   try {
//     const { product: productData } = req.body;

//     const result = await ProductServices.productCreateIntoDB(productData);
//     res.status(200).json({
//       success: true,
//       message: 'Product created successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({
//       success: false,
//       message: 'Failed to create product!',
//       error: err, // Sending only error message for security
//     });
//   }
// };
const createProduct = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { product: productData } = req.body;
    const { error } = ProductJoiSchema.validate(productData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details,
      });
    }
    const result = await ProductServices.productCreateIntoDB(productData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getallProduct(searchTerm);
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products!',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProduct(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product!',
      error: err,
    });
  }
};

// const updateSingleProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { product: updateData } = req.body;

//     const result = await ProductServices.updateSingleProduct(
//       productId,
//       updateData,
//     );
//     if (result.modifiedCount > 0) {
//       res.status(200).json({
//         success: true,
//         message: 'Product updated successfully!',
//         data: result,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: 'Product not found or no changes made!',
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({
//       success: false,
//       message: 'Failed to update product!',
//       error: err,
//     });
//   }
// };
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product: updateData } = req.body;
    // Validate request body
    const { error } = ProductJoiSchema.validate(updateData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details,
      });
    }

    const result = await ProductServices.updateSingleProduct(
      productId,
      updateData,
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found or no changes made!',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: 'Failed to update product!',
      error: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProduct(productId);
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product!',
      error: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
