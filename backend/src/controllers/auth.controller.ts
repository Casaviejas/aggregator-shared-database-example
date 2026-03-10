import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { RegisterBody } from "../middlewares/validate.middleware";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as RegisterBody;

    const user = await registerUser(body);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user,
    });
  } catch (error) {
    const err = error as Error & { statusCode?: number };

    // Error controlado desde el servicio (ej: email duplicado → 409)
    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    // Error inesperado del servidor
    console.error("[register]", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
