import { TokenAdapter } from "@domain/adapters/token";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly tokenAdapter: TokenAdapter) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Missing or invalid authorization header"
      );
    }

    try {
      const token = authHeader.slice(7);
      const payload = this.tokenAdapter.verify(token);
      request["user"] = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
