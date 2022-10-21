import { NavigationContainer } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import React from 'react';
import { SideMenuFactory } from './components/side-menu';

const App = () => {
    const SideMenu = SideMenuFactory({
        Home: () => <Text>Home</Text>,
        Settings: () => <Text>Settings</Text>,
    });

    return (
        <NavigationContainer>
            <SideMenu />
        </NavigationContainer>
    );
};

export default App;
