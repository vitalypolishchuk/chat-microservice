// src/middleware/response-header.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Add your response headers here
    res.header('X-Frame-Options', 'DENY'); // Prevents clickjacking attacks
    res.header('X-Content-Type-Options', 'nosniff'); // Prevents MIME type sniffing
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains'); // Enables HSTS
    res.header('Content-Security-Policy', "default-src 'self'"); // Content Security Policy

    next();
  }
}
