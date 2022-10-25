import { TokensDto } from './Tokens.dto';
import { UserDto } from './User.dto';

export interface AuthReturnDto extends TokensDto {
    user: UserDto;
}
