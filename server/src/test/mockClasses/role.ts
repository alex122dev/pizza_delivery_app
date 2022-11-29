import { Chance } from 'chance';
import { Role } from '../../domains/roles/entities/role.entity';

export class RoleClass implements Role {
  id = Chance().natural({ min: 1 });
  value: string;
  description = Chance().string({ length: 15 });
  users = [];

  constructor(value: string) {
    this.value = value;
  }
}

export class AdminRole extends RoleClass {
  constructor() {
    super('ADMIN');
    this.description = 'Administrator';
  }
}

export class UserRole extends RoleClass {
  constructor() {
    super('USER');
    this.description = 'Default user';
  }
}
