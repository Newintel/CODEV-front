import { Button, Center } from 'native-base';
import React from 'react';
import E_Screens from '../screens';
import useAppNavigation from '../../hooks/useAppNavigation';

const NotLogged = () => {
    const { navigate } = useAppNavigation();
    return (
        <Center h="100%">
            <Button onPress={() => navigate(E_Screens.Login)}>Log in</Button>
        </Center>
    );
};

export default NotLogged;
