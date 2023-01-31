import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { E_MenuType, T_Menu } from '../../../types';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import E_Storage from '../../../storage/storage';
import E_Screens from '../../../screens/screens';
import { useDispatch, useSelector } from 'react-redux';
import AuthSelectors from '../../../storage/redux/selectors/auth';
import AuthActions from '../../../storage/redux/actions/auth';

const style = StyleSheet.create({
    drawer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    logout: {
        backgroundColor: 'red',
    },
    login: {
        backgroundColor: 'blue',
    },
});

const DrawerContent = (
    props: DrawerContentComponentProps & { logged: boolean }
) => {
    const { removeItem } = useEncryptedStorage();
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={style.drawer}>
            <DrawerItemList {...props} />
            {props.logged ? (
                <DrawerItem
                    style={style.logout}
                    label={() => (
                        <Text bold color="white">
                            Logout
                        </Text>
                    )}
                    icon={() => <Icon name="logout" size={24} color="white" />}
                    onPress={() => {
                        removeItem({
                            key: E_Storage.TOKEN,
                            onSuccess: () => {
                                dispatch(AuthActions.logout());
                                props.navigation.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: E_Screens.Main,
                                        },
                                    ],
                                });
                            },
                        });
                    }}
                />
            ) : (
                <DrawerItem
                    style={style.login}
                    label={() => (
                        <Text bold color="white">
                            Login
                        </Text>
                    )}
                    icon={() => <Icon name="login" size={24} color="white" />}
                    onPress={() => {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: E_Screens.Login }],
                        });
                    }}
                />
            )}
        </DrawerContentScrollView>
    );
};

/**
 * Creates a side menu component.
 * This component should not be used directly, but rather through the SideMenuFactory function.
 */
const SideMenu: T_Menu<E_MenuType.SIDE> = ({
    components,
    initialRouteName,
}) => {
    const { Navigator, Screen } = createDrawerNavigator();
    const logged = useSelector(AuthSelectors.logged);

    return (
        <Navigator
            initialRouteName={initialRouteName}
            drawerContent={props => DrawerContent({ ...props, logged })}>
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
