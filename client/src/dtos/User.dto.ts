import { RoleDto } from './Role.dto';

export interface UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: RoleDto[];
}
