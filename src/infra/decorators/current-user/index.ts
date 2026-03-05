import { CustomerRole } from "@domain/entities/customer-role";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export interface JwtPayload {
  sub: string;
  role: CustomerRole;
  iat?: number;
  exp?: number;
}

export const CurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request["user"] as JwtPayload;
    return data ? user?.[data] : user;
  }
);
