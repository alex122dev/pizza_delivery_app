import { User } from '../entities/user.entity';

export class DeleteUserDto {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  constructor(userDto: Omit<User, 'id'>) {
    this.email = userDto.email;
    this.firstName = userDto.firstName;
    this.lastName = userDto.lastName;
    this.phone = userDto.phone;
  }
}
