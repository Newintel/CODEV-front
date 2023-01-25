import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MenuFactory from './components/menu/MenuFactory';
import { E_MenuType } from './types';
import Search from './screens/pages/search/Search';
import Home from './screens/pages/home/Home';
import MyAccount from './screens/pages/my-account/MyAccount';
import Login from './screens/pages/login/Login';
import { NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import E_Screens from './screens/screens';
import I_NavigationParams from './types/NavigationParams';

const App = () => {
    const BottomMenu = MenuFactory(
        E_MenuType.BOTTOM,
        {
            [E_Screens.Home]: {
                component: Home,
                icon: 'home-circle',
                name: 'Home',
            },
            [E_Screens.Search]: {
                component: Search,
                icon: 'magnify',
                name: 'Search',
            },
            [E_Screens.MyAccount]: {
                component: MyAccount,
                icon: 'account-circle',
                name: 'My Account',
            },
        },
        E_Screens.Home
    );

    const SideMenu = MenuFactory(E_MenuType.SIDE, {
        [E_Screens.Menu]: { component: BottomMenu, name: 'Menu' },
    });

    const { Navigator, Screen } = createNativeStackNavigator();

    return (
        <NativeBaseProvider>
            <NavigationContainer<I_NavigationParams>
                linking={{
                    prefixes: ['com.front://'],
                    config: {
                        screens: {
                            [E_Screens.Login]: {
                                path: 'login/:auth_message',
                                parse: {
                                    auth_message: auth_message => {
                                        const fields = auth_message
                                            .slice(1)
                                            .split('&')
                                            .map(field => {
                                                const [key, value] =
                                                    field.split('=');
                                                return { [key]: value };
                                            })
                                            .reduce((acc, cur) => {
                                                return { ...acc, ...cur };
                                            });

                                        return fields;
                                    },
                                },
                            },
                        },
                    },
                }}>
                <Navigator initialRouteName={E_Screens.Main}>
                    <Screen
                        name={E_Screens.Login}
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Screen
                        name={E_Screens.Main}
                        component={SideMenu}
                        options={{ headerShown: false }}
                    />
                </Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
