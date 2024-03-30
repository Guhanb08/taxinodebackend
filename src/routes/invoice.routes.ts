import express from "express";

import {
  findAllInvoiceController,
  findOneInvoiceController,
  createInvoiceController,
  updateInvoiceController,
  deleteInvoiceController,
  sendEmailInvoiceController,
  createInstantInvoiceController,
  sendSmsInvoiceController
  
} from "../controllers/invoice.controller";



import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/",  findAllInvoiceController);
router.get("/:id",  findOneInvoiceController);
router.get("/sendemail/:id",  sendEmailInvoiceController);
router.get("/sendsms/:id",  sendSmsInvoiceController);
router.post("/",  createInvoiceController);
router.post("/instant",  createInstantInvoiceController);
router.put("/:id",  updateInvoiceController);
router.delete("/:id",  deleteInvoiceController);

export default router;