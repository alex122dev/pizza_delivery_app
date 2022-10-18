import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { SignInDto } from 'src/domains/auth/dto/signin.dto';

export class CreateUserDto extends SignInDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  @IsPhoneNumber('UA')
  readonly phone: string;
}
