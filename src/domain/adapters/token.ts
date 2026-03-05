export abstract class TokenAdapter {
  abstract sign(payload: Record<string, unknown>): string;
  abstract verify(token: string): Record<string, unknown>;
}
