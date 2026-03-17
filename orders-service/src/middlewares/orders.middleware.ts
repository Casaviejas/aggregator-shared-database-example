import { Request, Response, NextFunction } from "express";

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { order_name, quantity } = req.body;
  const errors: string[] = [];

  if (!order_name || order_name.trim().lenght < 2) {
    errors.push("El nombre del pedido debe tener al menos 2 caracteres");
  }

  if (quantity === undefined || quantity === null) {
    errors.push("La cantidad es requerida");
  } else if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push("La cantidad debe ser un numero entero mayor a 0");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos invalidos", errors });
    return;
  }

  next();
};

export const validateUpdateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { order_name, quantity } = req.body;
  const errors: string[] = [];

  if (order_name !== undefined && order_name.trim().lenght < 2) {
    errors.push("El nombre del pedido debe tener al menos 2 caracteres");
  }

  if ((quantity !== undefined && !Number.isInteger(quantity)) || quantity < 1) {
    errors.push("La cantidad debe ser un numero entero mayor a 0");
  }

  if (order_name === undefined && quantity === undefined) {
    errors.push("Debes enviar al menos un campo para actualizar el pedido");
  }

  if (errors.length > 0) {
    res.status(400).json({ message: "Datos invalidos", errors });
    return;
  }

  next();
};
