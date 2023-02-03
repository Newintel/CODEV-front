import { E_Screens } from '../screens';
import { T_MenuComponent } from './MenuComponent';
import { E_MenuType } from './MenuType';

type T_ScreenPropsComponent<T extends E_MenuType> = T_MenuComponent<T> & {
    path: string;
};

export type T_ScreenProps<T extends E_MenuType> = {
    components: T_ScreenPropsComponent<T>[];
    initialRouteName?: E_Screens;
};
