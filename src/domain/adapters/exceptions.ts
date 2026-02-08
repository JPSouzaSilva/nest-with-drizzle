export abstract class ExceptionsAdapter {
  abstract badRequest(message: string): void;
  abstract conflict(message: string): void;
  abstract internalServerError(message: string): void;
  abstract forbidden(message: string): void;
  abstract unauthorized(message: string): void;
  abstract notFound(message: string): void;
}
