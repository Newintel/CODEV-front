import { WithEdges } from './api';

export interface I_User extends WithEdges<{ friends?: I_User }> {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
}
