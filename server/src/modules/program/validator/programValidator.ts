import type { NextFunction, Request, Response } from "express";
import joi from "joi";

export const programSchema = joi.object({
  title: joi.string().max(255).required(),
  synopsis: joi.string().allow(""),
  poster: joi.string().allow(""),
  country: joi.string().max(255).allow(""),
  year: joi.number().integer().min(1900).max(new Date().getFullYear()),
  category_id: joi.number().integer().required(),
});

interface ValidationErrorDetail {
  message: string;
  path: (string | number)[];
  type: string;
  context?: Record<string, unknown>;
}

interface ValidationError {
  details: ValidationErrorDetail[];
}

export const validateProgram = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { error }: { error?: ValidationError } = programSchema.validate(
    req.body,
    { abortEarly: false },
  );

  if (!error) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default validateProgram;
