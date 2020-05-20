import { RoleEntity } from './role-entity';
import { UserEntityProperty } from './user-entity-property';
export declare class UserEntity {
    authorities: RoleEntity[];
    email: string;
    emailVerified: boolean;
    enabled: boolean;
    firstName: string;
    password: string;
    id: string;
    imageUrl: string;
    lastName: string;
    phone: string;
    properties: UserEntityProperty[];
    provider: string;
    providerId: string;
    username: string;
    acknowledged: boolean;
}
