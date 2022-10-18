import { User } from 'src/domains/users/entities/user.entity';

export class UserPayloadDto {
  id: number;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}
