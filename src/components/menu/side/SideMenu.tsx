import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { E_MenuType, T_Menu } from '../../../types';

/**
 * Creates a side menu component.
 * This component should not be used directly, but rather through the SideMenuFactory function.
 */
const SideMenu: T_Menu<E_MenuType.SIDE> = ({ components }) => {
    const { Navigator, Screen } = createDrawerNavigator();
    return (
        <Navigator initialRouteName="Menu">
            {components.map(({ path, component, name }, index) => (
                <Screen
                    name={path}
                    key={index}
                    options={{
                        drawerLabel: name ?? path,
                    }}>
                    {component}
                </Screen>
            ))}
        </Navigator>
    );
};
export default SideMenu;
