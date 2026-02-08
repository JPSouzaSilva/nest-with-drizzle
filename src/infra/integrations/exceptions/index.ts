import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class ExceptionsIntegration extends ExceptionsAdapter {
  badRequest(message: string): void {
    throw new BadRequestException(message);
  }

  conflict(message: string): void {
    throw new ConflictException(message);
  }

  internalServerError(message: string): void {
    throw new InternalServerErrorException(message);
  }

  forbidden(message: string): void {
    throw new ForbiddenException(message);
  }

  unauthorized(message: string): void {
    throw new UnauthorizedException(message);
  }

  notFound(message: string): void {
    throw new NotFoundException(message);
  }
}
