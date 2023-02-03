import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { E_MenuType, T_Menu } from '../../../types';
import { isString } from '../../../utils';

/**
 * Creates a bottom tab menu component.
 * This component should not be used directly, but rather through the SideMenuFactory function.
 */
const BottomMenu: T_Menu<E_MenuType.BOTTOM> = ({
    components: parentComponents,
    initialRouteName,
}) => {
    const { Navigator, Screen } = createBottomTabNavigator();
    type t_parent = (typeof parentComponents)[number];
    type t_path = Pick<t_parent, 'path'>;
    type t_icon = Pick<t_parent, 'icon'>;

    const { components, icons } = React.useMemo<{
        components: Omit<t_parent, 'icon'>[];
        icons: Record<t_path['path'], t_icon['icon']>;
    }>(() => {
        const _components = [];
        const _icons: Record<t_path['path'], t_icon['icon']> = {};
        for (const [, { component, icon, name, path }] of Object.entries(
            parentComponents
        )) {
            _components.push({ component, name, path });
            _icons[path] = icon;
        }
        return { components: _components, icons: _icons };
    }, [parentComponents]);

    return (
        <Navigator
            initialRouteName={initialRouteName}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const icon = icons[route.name];

                    if (isString(icon)) {
                        const outline = `${icon}${focused ? '-outline' : ''}`;
                        return (
                            <Icon
                                name={Icon.hasIcon(outline) ? outline : icon}
                                size={size}
                                color={color}
                            />
                        );
                    }

                    return icon({ focused, color, size });
                },
            })}>
            {components.map(({ path, name, component }, index) => (
                <Screen
                    name={path}
                    key={index}
                    options={{ tabBarLabel: name ?? path }}>
                    {component}
                </Screen>
            ))}
        </Navigator>
    );
};

export default BottomMenu;
