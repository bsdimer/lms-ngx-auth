import {RoleEntity} from './role-entity';

export class Client {
    id: string;
    name: string;
    password: string;
    authorities?: RoleEntity[];
}
