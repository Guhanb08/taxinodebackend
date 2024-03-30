import express from "express";

import {
  findAllUserController,
  findOneUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";

import authMiddleware from "../middleware/userAuth";

const router = express.Router();

router.get("/",  findAllUserController);
router.get("/:id",  findOneUserController);
router.post("/",  createUserController);
router.put("/:id",  updateUserController);
router.delete("/:id",  deleteUserController);

export default router;
