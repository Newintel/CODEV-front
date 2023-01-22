import React, { useEffect } from 'react';
import { Text } from 'react-native';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import E_Storage from '../../../storage/storage';

const Home = () => {
    const { getItem } = useEncryptedStorage();

    useEffect(() => {
        getItem({ key: E_Storage.TOKEN, onSuccess: console.log });
    }, [getItem]);

    return <Text>Home</Text>;
};

export default Home;
