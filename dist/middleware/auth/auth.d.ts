import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const auth: (req: JwtPayload, res: Response, next: NextFunction) => Promise<void>;
