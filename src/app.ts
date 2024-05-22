import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
export const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);

const helloMessage = (req: Request, res: Response) => {
  const msg = 'Hi, Welcome to our application';
  res.send(msg);
};

app.get('/', helloMessage);
export default app;
