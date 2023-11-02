import express, { Request, Response, NextFunction } from 'express';
import router from './router';

const app = express();

function cors(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
}

app.use(cors)

app.disable('etag');
app.use(express.json());
app.use(router);

export default app;
