import { SignInDto } from './SignIn.dto';

export interface SignUpDto extends SignInDto {
  firstName: string;
  lastName: string;
  phone: string;
}
