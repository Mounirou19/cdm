import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: "Validation error",
          details: err.errors,
          statusCode: 400,
        });
        return;
      }
      next(err);
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params) as typeof req.params;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: "Validation error",
          details: err.errors,
          statusCode: 400,
        });
        return;
      }
      next(err);
    }
  };
}
