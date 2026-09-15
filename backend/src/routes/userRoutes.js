import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/perfil", authMiddleware, getProfile);

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    return res.status(200).json({
      message: "Área administrativa acessada com sucesso!",
      usuario: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      }
    });
  }
);

export default router;