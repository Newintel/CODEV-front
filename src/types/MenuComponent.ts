import { ColorValue } from 'react-native';
import { E_MenuType } from './MenuType';

export type T_MenuComponent<T extends E_MenuType> = {
    component: () => JSX.Element;
    name?: string;
} & (T extends E_MenuType.BOTTOM
    ? {
          icon:
              | string
              | ((props: {
                    focused: boolean;
                    size?: number;
                    color?: ColorValue | number;
                }) => JSX.Element);
      }
    : {});
