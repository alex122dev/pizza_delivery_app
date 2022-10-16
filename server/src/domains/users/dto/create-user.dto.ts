import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({ message: 'The email field cannot be empty' })
    @IsEmail({}, { message: 'The email field must be in email format' })
    readonly email: string
    @IsNotEmpty({ message: 'The password field cannot be empty' })
    @Length(6, 100, { message: 'The password field must contain more than 5 and less than 100 characters' })
    readonly password: string
    @IsNotEmpty({ message: 'The firstName field cannot be empty' })
    readonly firstName: string
    @IsNotEmpty({ message: 'The lastName field cannot be empty' })
    readonly lastName: string
    @IsNotEmpty({ message: 'The phone field cannot be empty' })
    @IsPhoneNumber('UA', { message: 'The phone field value is invalid' })
    readonly phone: string
}
