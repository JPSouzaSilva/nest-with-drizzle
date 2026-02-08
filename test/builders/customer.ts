import { Customer } from "@domain/entities/customer";
import { faker } from "@faker-js/faker";

export const mockCustomerBuilder = (
  override: Partial<Customer> = {},
): Customer => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    dateOfBirth: faker.date.birthdate(),
    ...override,
  };
};
