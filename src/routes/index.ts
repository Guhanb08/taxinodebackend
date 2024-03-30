import { Router } from 'express';
import authRouter from './auth.routes';
import branchRouter from './branch.routes';
import userRouter from './user.routes';
import ledgerRouter from './ledger.routes';
import ledgercategoryRouter from './ledgercategory.routes';
import productRouter from './product.routes';
import customerRouter from './customer.routes';
import companyRouter from './company.routes';
import invoiceRouter from './invoice.routes';




const router = Router();

router.use('/auth', authRouter);
router.use('/branch', branchRouter);
router.use('/user', userRouter);
router.use('/ledger', ledgerRouter);
router.use('/ledgercategory', ledgercategoryRouter);
router.use('/product', productRouter);
router.use('/customer', customerRouter);
router.use('/company', companyRouter);
router.use('/invoice', invoiceRouter);






export default router;
