/// <reference types="express" />
export declare const sendEmail: (to: string, subject: string, html: string) => Promise<import("express").Response<any, Record<string, any>> | undefined>;
