export abstract class TotpAdapter {
  abstract generateSecret(): string;
  abstract generateUri(email: string, secret: string): string;
  abstract verify(token: string, secret: string): boolean;
}
