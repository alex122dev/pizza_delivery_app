import { UserDto } from "src/domains/users/dto/user.dto"
import { TokensReturnDto } from "./tokensReturn.dto"

export class AuthReturnDto extends TokensReturnDto {
    readonly user: UserDto
}
