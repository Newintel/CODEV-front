import { Button, Center, Text, View } from 'native-base';
import React from 'react';
import E_Screens from '../screens';
import useAppNavigation from '../../hooks/useAppNavigation';

const NotLogged = () => {
    const { navigate } = useAppNavigation();
    return (
        <View h="100%">
            <Center h="100%">
                <Text fontSize="xl" mb={5}>
                    You must be logged in to use this feature
                </Text>
                <Button onPress={() => navigate(E_Screens.Login)}>
                    Log in
                </Button>
            </Center>
        </View>
    );
};

export default NotLogged;
