import { Customer } from "@domain/entities/customer";
import { CustomerRole } from "@domain/entities/customer-role";

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: Date;
  role: "NORMAL" | "PREMIUM";
  totpSecret: string | null;
}

export class CustomerMapper {
  static toDomain(row: CustomerRow): Customer {
    return { ...row, role: row.role as CustomerRole };
  }
}
