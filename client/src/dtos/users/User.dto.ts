import { RoleDto } from '../roles/Role.dto';

export interface UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: RoleDto[];
}
