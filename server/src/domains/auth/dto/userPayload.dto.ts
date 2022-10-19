import { Role } from 'src/domains/roles/entities/role.entity';
import { User } from 'src/domains/users/entities/user.entity';

export class UserPayloadDto {
  id: number;
  email: string;
  roles: Role[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.roles = user.roles;
  }
}
