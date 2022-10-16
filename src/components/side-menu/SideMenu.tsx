import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

export type SideMenuComponentType = (props: { navigation: any }) => JSX.Element;

interface Props {
    components: {
        name: string;
        component: SideMenuComponentType;
    }[];
}

/**
 * Creates a side menu component.
 * This component should not be used directly, but rather through the SideMenuFactory function.
 */
const SideMenu = ({ components }: Props) => {
    const { Navigator, Screen } = createDrawerNavigator();
    return (
        <Navigator initialRouteName="Home">
            {components.map((props, index) => (
                <Screen {...props} key={index} />
            ))}
        </Navigator>
    );
};

export default SideMenu;
