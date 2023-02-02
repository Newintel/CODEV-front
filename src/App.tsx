import React, { useState } from 'react';
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
import Container from './components/Container';
import { Provider } from 'react-redux';
import store from './storage/redux/store';
import useNfcManager from './hooks/useNfcManager';
import { useEffect } from 'react';
import useEncryptedStorage from './hooks/useEncryptedStorage';
import E_Storage from './storage/storage';
import Friends from './screens/pages/friends/Friends';
import FriendRequests from './screens/pages/friends/FriendRequests';

const App = () => {
    const BottomMenu = MenuFactory(
        E_MenuType.BOTTOM,
        {
            [E_Screens.Home]: {
                component: Container({ Component: Home }),
                icon: 'home-circle',
            },
            [E_Screens.Search]: {
                component: Container({ Component: Search, mustBeLogged: true }),
                icon: 'magnify',
            },
            [E_Screens.MyAccount]: {
                component: Container({
                    Component: MyAccount,
                    mustBeLogged: true,
                }),
                icon: 'account-circle',
                name: 'My Account',
            },
        },
        E_Screens.Home
    );

    const FriendsBottomMenu = MenuFactory(
        E_MenuType.BOTTOM,
        {
            [E_Screens.Friends]: {
                component: Container({
                    Component: Friends,
                    mustBeLogged: true,
                }),
                icon: 'account-group',
            },
            [E_Screens.FriendRequests]: {
                component: Container({
                    Component: FriendRequests,
                    mustBeLogged: true,
                }),
                name: 'Friend Requests',
                icon: 'account-plus',
            },
        },
        E_Screens.Friends
    );

    const SideMenu = MenuFactory(
        E_MenuType.SIDE,
        {
            [E_Screens.Menu]: { component: BottomMenu },
            [E_Screens.FriendsMenu]: {
                component: FriendsBottomMenu,
                name: 'Friends',
            },
        },
        E_Screens.Menu
    );

    const { Navigator, Screen } = createNativeStackNavigator();

    const { launchTag } = useNfcManager();
    const { removeItem, getItem } = useEncryptedStorage();

    const [goToLogin, setGoToLogin] = useState(false);

    useEffect(() => {
        if (launchTag) {
            removeItem({
                key: E_Storage.TOKEN,
                onSuccess: () => setGoToLogin(true),
            });
        } else {
            getItem({
                key: E_Storage.TOKEN,
                onSuccess: () => setGoToLogin(true),
            });
        }
    });

    return (
        <Provider store={store}>
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
                    <Navigator
                        initialRouteName={
                            goToLogin ? E_Screens.Login : E_Screens.Main
                        }>
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
        </Provider>
    );
};

export default App;
