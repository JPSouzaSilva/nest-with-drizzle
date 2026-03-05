export class TwoFactorCode {
  id: string;
  customerId: string;
  code: string;
  expiresAt: Date;
  used: boolean;
}
