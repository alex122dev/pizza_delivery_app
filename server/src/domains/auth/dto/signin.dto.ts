import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class SignInDto {
    @IsNotEmpty({ message: 'The email field cannot be empty' })
    @IsEmail({}, { message: 'The email field must be in email format' })
    readonly email: string
    @IsNotEmpty({ message: 'The password field cannot be empty' })
    @Length(6, 100, { message: 'The password field must contain more than 5 and less than 100 characters' })
    readonly password: string
}