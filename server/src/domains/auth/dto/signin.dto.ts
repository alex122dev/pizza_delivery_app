import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    @Length(6, 100)
    readonly password: string
}
