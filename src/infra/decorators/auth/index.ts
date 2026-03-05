import { CustomerRole } from "@domain/entities/customer-role";
import { JwtGuard } from "@infra/guards/jwt";
import { RolesGuard } from "@infra/guards/roles";
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

export const ROLES_KEY = "roles";

export const Auth = (...roles: CustomerRole[]): MethodDecorator =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtGuard, RolesGuard)
  );
