import { WithEdges } from './api';

export interface I_User extends WithEdges<{ friends?: I_User }> {
    id: string;
    firstname?: string;
    lastname?: string;
    email: string;
}

export interface I_ModifyUser extends Pick<I_User, 'firstname' | 'lastname'> {}

export interface I_UserFilter {
    name: string;
}
