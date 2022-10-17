import { Token } from "../entities/token.entity";

export class SignOutDto {
    token: Omit<Token, 'id'>
    message: string
}