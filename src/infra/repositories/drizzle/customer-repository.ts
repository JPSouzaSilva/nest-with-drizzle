import { Customer } from "@domain/entities/customer";
import {
  CustomerRepository,
  UpdateCustomerData
} from "@domain/repositories/customer";
import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { customers } from "drizzle/schema";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "@infra/modules/database/tokens";
import {
  PaginatedResponse,
  PaginationParams
} from "@domain/constants/pagination";

@Injectable()
export class DrizzleCustomerRepository implements CustomerRepository {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async findByEmail(email: string): Promise<Customer | null> {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.email, email));

    if (!customer) return null;

    return customer;
  }

  async create(customer: Customer): Promise<void> {
    await this.db.insert(customers).values({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      state: customer.state,
      zipCode: customer.zipCode,
      country: customer.country,
      dateOfBirth: customer.dateOfBirth
    });
  }

  async findAll({
    page,
    limit
  }: PaginationParams): Promise<PaginatedResponse<Customer>> {
    const [data, total] = await Promise.all([
      this.db
        .select()
        .from(customers)
        .limit(limit)
        .offset((page - 1) * limit),
      this.db.$count(customers)
    ]);

    return {
      data,
      total,
      page,
      limit
    };
  }

  async findById(id: string): Promise<Customer | null> {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.id, id));

    if (!customer) return null;

    return customer;
  }

  async update(id: string, customer: UpdateCustomerData): Promise<void> {
    await this.db
      .update(customers)
      .set({
        name: customer.name,
        email: customer.email,
        address: customer.address,
        state: customer.state,
        zipCode: customer.zipCode,
        country: customer.country,
        dateOfBirth: customer.dateOfBirth
      })
      .where(eq(customers.id, id));
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(customers).where(eq(customers.id, id));
  }
}
