import express from "express";
import userController from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userController.listAll(req, res);
});

userRouter.post("/", (req, res) => {
  userController.createuser(req, res);
});

export default userRouter;
