import { RoleDto } from 'src/domains/roles/dto/role.dto';
import { User } from '../entities/user.entity';

export class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: RoleDto[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.roles = user.roles;
  }
}
