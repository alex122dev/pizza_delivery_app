export class CreateUserDto {
    readonly email: string // Validate email
    readonly password: string // Not empty
    readonly firstName: string // Not empty 
    readonly lastName: string // Not empty
    readonly phone: number // Phone number
}
