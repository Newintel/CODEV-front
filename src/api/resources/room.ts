import { WithEdges } from './api';
export interface I_Room extends WithEdges<{ room: I_InternalRoom }> {
    freeTime: number;
}

export interface I_InternalRoom {
    id: number;
    name: string;
    floor: string;
    building: string;
    capacity: number;
    edges: {};
}
