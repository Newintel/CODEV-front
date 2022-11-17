import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MenuFactory from './components/menu/MenuFactory';
import { E_MenuType } from './types';
import Search from './components/pages/search/Search';
import Home from './components/pages/home/Home';
import MyAccount from './components/pages/my-account/MyAccount';

const App = () => {
    const BottomMenu = MenuFactory(E_MenuType.BOTTOM, {
        Home: { component: Home, icon: 'home-circle', name: 'Menu principal' },
        Search: {
            component: Search,
            icon: 'magnify',
            name: 'Chercher',
        },
        MyAccount: {
            component: MyAccount,
            icon: 'account-circle',
            name: 'Mon compte',
        },
    });
    const SideMenu = MenuFactory(E_MenuType.SIDE, {
        Menu: { component: BottomMenu, name: 'Menu' },
    });

    return (
        <NavigationContainer>
            <SideMenu />
        </NavigationContainer>
    );
};

export default App;
