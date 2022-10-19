import { Role } from 'src/domains/roles/entities/role.entity';
import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: Role[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.roles = user.roles;
  }
}
