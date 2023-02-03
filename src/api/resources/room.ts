import { WithEdges } from './api';
export interface I_Room extends WithEdges<{ rooms: I_InternalRoom }> {
    start: string;
    end: string;
    id: number;
}

export interface I_InternalRoom {
    id: number;
    name: string;
    floor: string;
    building: string;
    capacity: number;
    edges: {};
}
