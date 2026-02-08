import { ExceptionsAdapter } from "@domain/adapters/exceptions";

export class ExceptionsAdapterStub extends ExceptionsAdapter {
  badRequest(): void {
    return;
  }
  conflict(): void {
    return;
  }
  internalServerError(): void {
    return;
  }
  forbidden(): void {
    return;
  }
  unauthorized(): void {
    return;
  }
  notFound(): void {
    return;
  }
}
