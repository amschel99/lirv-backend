import { AuthenticatedRequest } from "../interfaces";
import { Request, Response } from "express";
export function validateBody(
  interfaceDef: object,
  req: AuthenticatedRequest | Request,
  res: Response
) {
  const requiredFields: Array<string> = Object.keys(interfaceDef);
  const missingFields = requiredFields.filter(
    (field) => !req.body.hasOwnProperty(field)
  );
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
}
