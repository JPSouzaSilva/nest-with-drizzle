import { TwoFactorCode } from "@domain/entities/two-factor-code";
import { TwoFactorCodeRepository } from "@domain/repositories/two-factor-code";
import { DRIZZLE } from "@infra/modules/database/tokens";
import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gt, lte } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { twoFactorCodes } from "drizzle/schema";

@Injectable()
export class DrizzleTwoFactorCodeRepository implements TwoFactorCodeRepository {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async create(code: TwoFactorCode): Promise<void> {
    await this.db.insert(twoFactorCodes).values({
      id: code.id,
      customerId: code.customerId,
      code: code.code,
      expiresAt: code.expiresAt,
      used: code.used
    });
  }

  async findValidCode(
    customerId: string,
    code: string
  ): Promise<TwoFactorCode | null> {
    const [record] = await this.db
      .select()
      .from(twoFactorCodes)
      .where(
        and(
          eq(twoFactorCodes.customerId, customerId),
          eq(twoFactorCodes.code, code),
          eq(twoFactorCodes.used, false),
          gt(twoFactorCodes.expiresAt, new Date())
        )
      );

    if (!record) return null;

    return record;
  }

  async markAsUsed(id: string): Promise<void> {
    await this.db
      .update(twoFactorCodes)
      .set({ used: true })
      .where(eq(twoFactorCodes.id, id));
  }

  async deleteExpired(): Promise<void> {
    await this.db
      .delete(twoFactorCodes)
      .where(lte(twoFactorCodes.expiresAt, new Date()));
  }
}
