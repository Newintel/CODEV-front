import { T_Enum } from '../types/Enum';
import { T_MapEnum } from '../types/MapEnum';

// Permet de mapper une énumération sur une fonction
// Utile en cas d'ajout de valeurs à l'énumération
const MapEnum =
    <T extends T_Enum, R>(_: T) =>
    (
        mapping: Partial<T_MapEnum<T, R>> & {
            _: R;
        },
    ) =>
    (property: T[keyof T]) =>
        mapping[property] || mapping._;

export default MapEnum;
