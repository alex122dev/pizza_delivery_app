import { TokensDto } from './Tokens.dto';
import { UserDto } from '../users/User.dto';

export interface AuthReturnDto extends TokensDto {
  user: UserDto;
}
