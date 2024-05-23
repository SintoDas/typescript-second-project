import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';
export const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

const helloMessage = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(' Products and orders controlling app');
  } catch (error) {
    next(error);
  }
};

app.get('/', helloMessage);
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
});
export default app;
