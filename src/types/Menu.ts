import { E_MenuType } from './MenuType';
import { T_ScreenProps } from './ScreenProps';

export type T_Menu<T extends E_MenuType> = ({
    components,
    initialRouteName,
}: T_ScreenProps<T>) => JSX.Element;
