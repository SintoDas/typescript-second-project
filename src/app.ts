import express, { Application, Request, Response } from 'express';
import cors from 'cors';
export const app: Application = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  const a = 20;
  res.send(`Hello World! ${a}`);
});
