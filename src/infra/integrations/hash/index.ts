import { HashAdapter } from "@domain/adapters/hash";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

@Injectable()
export class BcryptHashIntegration extends HashAdapter {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, SALT_ROUNDS);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
