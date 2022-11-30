import { Chance } from 'chance';
import { User } from '../../domains/users/entities/user.entity';
import { mockFactory } from '../mockFactory';

export class UserClass implements User {
  id = Chance().natural({ min: 1 });
  email = Chance().email();
  password = Chance().string({ length: 10 });
  firstName = Chance().first();
  lastName = Chance().last();
  phone = Chance().phone({ formatted: false });
  roles = [mockFactory.getRole('user')];
  orders = [];
}

export class UserWithAdminRole extends UserClass {
  constructor() {
    super();
    const adminRole = mockFactory.getRole('admin');
    this.roles = [...this.roles, adminRole];
  }
}
