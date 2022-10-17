import { User } from "src/domains/users/entities/user.entity"
import { TokensReturnDto } from "./tokensReturn.dto"

export class AuthReturnDto extends TokensReturnDto {
    readonly user: User
}