import { T_Enum } from './Enum';

export type T_MapEnum<T extends T_Enum, R> = { [key in T[keyof T]]: R };
