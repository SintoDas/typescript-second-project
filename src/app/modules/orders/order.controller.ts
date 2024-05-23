import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';
import orderJoiSchema from './order.joi.validation';

// const createOrder = async (req: Request, res: Response) => {
//   try {
//     const { order: orderData } = req.body;
//     const result = await OrderServices.orderCreateIntoMongoDB(orderData);
//     res.status(200).json({
//       succuss: true,
//       message: 'Order created successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    const { error } = orderJoiSchema.validate(orderData);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details,
      });
    }

    // Check available quantity in inventory
    const product = await ProductServices.getSingleProduct(orderData.productId);
    if (!product || product.inventory.quantity < orderData.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Reduce inventory quantity
    const updatedInventory = await ProductServices.updateInventory(
      orderData.productId,
      orderData.quantity,
    );

    // Create order
    const result = await OrderServices.orderCreateIntoMongoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to create order!',
      error: err,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email as string;
    let result;

    if (userEmail) {
      result = await OrderServices.getAllOrderByEmail(userEmail);
      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
    } else {
      result = await OrderServices.getAllOrder();
    }

    res.status(200).json({
      success: true,
      message: userEmail
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: err,
    });
  }
};

// const getAllOrder = async (req: Request, res: Response) => {
//   try {
//     const userEmail = req.query.email as string;
//     let result;

//     if (userEmail) {
//       result = await OrderServices.getAllOrderByEmail(userEmail);
//     } else {
//       result = await OrderServices.getAllOrder();
//     }

//     res.status(200).json({
//       success: true,
//       message: userEmail
//         ? 'Orders fetched successfully for user email!'
//         : 'Orders fetched successfully!',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: 'Order not found',
//     });
//   }
// };

export const orderController = {
  createOrder,
  getAllOrder,
};
