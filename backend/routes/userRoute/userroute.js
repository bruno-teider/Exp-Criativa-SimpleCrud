import express from "express";
import {
  getUser,
  postUser,
  deleteUser,
  updateUser,
  getSingleUser,
} from "../../crontroller/user_controller/user_controller.js";

const router = express.Router();

router.get("/usuarios", getUser);
router.get("/usuario_unico/:id", getSingleUser);
router.post("/usuarios", postUser);
router.delete("/usuarios/:id", deleteUser);
router.put("/usuarios/:id", updateUser);

export default router;
