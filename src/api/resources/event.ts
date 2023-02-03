import { WithEdges } from './api';
import { I_User } from './user';
import { I_InternalRoom } from './room';

export interface I_Event
    extends WithEdges<{ admin: I_User; room: I_InternalRoom }> {
    id: number;
    name: string;
    activity: string;
    start: string;
    end: string;
}

export interface I_EventInvite {
    eventId: number;
    userId: string;
}
