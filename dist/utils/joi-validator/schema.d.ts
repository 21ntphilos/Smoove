import { Request, Response, NextFunction } from "express";
export declare const option: {
    abortEarly: boolean;
    errors: {
        wrap: {
            label: string;
        };
    };
};
export declare const updateUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const RegisterUser: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const createUser: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendemailToken: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const changePasswordJoi: (req: Request, res: Response, next: Function) => Promise<Response<any, Record<string, any>> | undefined>;
