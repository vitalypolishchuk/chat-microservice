export interface JwtPayload {
    email: string;
    id: string;
    role: "admin" | "user"
}

export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}