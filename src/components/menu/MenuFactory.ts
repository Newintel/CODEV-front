import SideMenu from './side/SideMenu';
import BottomMenu from './bottom/BottomMenu';
import MapEnum from '../../utils/MapEnum';
import { E_MenuType, T_Menu, T_MenuComponent } from '../../types';
import E_Screens from '../../screens/screens';

/**
 * @param {E_MenuType} type - The {@link E_MenuType} type of menu to create.
 * @param routes - object with the routes to be displayed in the menu:
 * the key is the name of the route, and the value is the component to be rendered when the route is selected.
 *
 * @example
 * MenuFactory(E_MenuType.BOTTOM, {
 *  page1 : {
 *      // To access navigation data, use the useNavigation hook
 *      component: ComponentMethod,
 *      // only for bottom menu, Material Community Icon
 *      // when the app will be displayed, will change to `${iconname}-outline`, if that icon exists
 *      icon: 'typescript',
 *      // not required, displayed name in the menu, default is the key name (here 'page1')
 *      name: 'My component',
 *  },
 * });
 *
 * @returns component of type {@link SideMenu} or {@link BottomMenu}, to place inside a NavigationContainer component.
 * The {@link BottomMenu} components must contain only inline functions and/or components, because it won't be re-rendered.
 */
const MenuFactory =
    <T extends E_MenuType>(
        type: T,
        routes: Record<string, T_MenuComponent<typeof type>>,
        initialRouteName?: E_Screens
    ) =>
    () => {
        return (
            MapEnum(E_MenuType)({
                [E_MenuType.SIDE]: SideMenu,
                [E_MenuType.BOTTOM]: BottomMenu,
                _: () => {
                    throw new Error('Menu type not supported');
                },
            })(type) as T_Menu<T>
        )({
            components: Object.entries(routes).map(([path, component]) => ({
                path,
                ...component,
            })),
            initialRouteName,
        });
    };

export default MenuFactory;
