import { Router } from 'express';
import { startPage, apiTest, notFoungPage } from '../controllers/index.controller';
const indexRouter = Router();

indexRouter.get('/', startPage);
indexRouter.get('/api', apiTest);
indexRouter.use(notFoungPage);
export { indexRouter }
