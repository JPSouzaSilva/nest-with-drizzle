import { CustomerRole } from "./customer-role";

export class Customer {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: Date;
  role: CustomerRole;
  totpSecret: string | null;
}
