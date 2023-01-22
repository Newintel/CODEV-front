import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Link,
    Skeleton,
    Square,
    Stack,
    Toast,
    View,
    VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { FetchResources } from '../../../api/FetchResources';
import RegisterModal from '../../../components/RegisterModal';
import Screens from '../../screens';
import I_NavigationParams from '../../../types/NavigationParams';
import { AppState } from 'react-native';
import { I_LoginResponse } from '../../../api/resources/auth';
import useFetchResources from '../../../hooks/useFetchResources';
import getLoginError from '../../../utils/getLoginError';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import E_Storage from '../../../storage/storage';
import { useCallback } from 'react';

const Login = () => {
    const { getState, navigate } =
        useNavigation<NavigationProp<I_NavigationParams>>();

    const { setItem } = useEncryptedStorage();

    const [listening] = useState(false);
    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [stateParams, setStateParams] =
        useState<Readonly<I_LoginResponse | undefined>>();

    const appStateChangedCallback = React.useCallback(
        (nextAppState: string) => {
            if (nextAppState === 'active') {
                setStateParams(
                    getState().routes.find(
                        route => route.name === Screens.Login
                    )?.params?.auth_message
                );
            }
        },
        [getState]
    );

    AppState.addEventListener('change', appStateChangedCallback);

    const {
        fetchData: _login,
        isFetching,
        isFetched: isLoginFetched,
    } = useFetchResources({
        resource: FetchResources.LOGIN,
        method: 'POST',
    });

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const login = useCallback(() => {
        if (email === '') {
            Toast.show({
                title: 'Email is required',
            });
            return;
        }

        if (email.includes('.') === false) {
            Toast.show({
                title: 'Email is invalid',
            });
            return;
        }

        if (password === '') {
            Toast.show({
                title: 'Password is required',
            });
            return;
        }

        _login({
            email: `${email}@etu.univ-lyon1.fr`,
            password,
        });
    }, [email, password, _login]);

    const {
        fetchData: register,
        isFetching: isRegisterFetching,
        isFetched: isRegisterFetched,
    } = useFetchResources({
        resource: FetchResources.SIGNUP,
        method: 'POST',
    });

    useEffect(() => {
        if (stateParams && (isLoginFetched || isRegisterFetched)) {
            console.debug('Login or register fetched and link used');
            console.debug({ stateParams });
            if (stateParams.error !== undefined) {
                Toast.show({
                    title: 'Error',
                    description:
                        getLoginError(stateParams.error_code) ??
                        stateParams.error_description?.split('+').join(' '),
                    duration: 5000,
                });
            }

            if (stateParams.access_token !== undefined) {
                setItem({
                    key: E_Storage.TOKEN,
                    value: stateParams.access_token,
                    onSuccess: () => navigate(Screens.Main),
                });
            }
        }
    }, [stateParams, isLoginFetched, navigate, setItem, isRegisterFetched]);

    return (
        <View flex={1} backgroundColor={'blue.100'}>
            <Square mx="auto" height={'25%'}>
                <Heading>Welcome to our app!</Heading>
            </Square>
            <Box height={'55%'}>
                <Center flex={1}>
                    <Box>
                        <Heading mb="3" mx="auto">
                            Login with your E-Mail address...
                        </Heading>
                        <VStack mx={'auto'} alignSelf={'center'} width="90%">
                            <FormControl isRequired isInvalid mb={2}>
                                <FormControl.Label>
                                    Student email address
                                </FormControl.Label>
                                <Stack>
                                    <InputGroup>
                                        <Input
                                            w={{
                                                base: '60%',
                                                md: '100%',
                                            }}
                                            placeholder="fisrtname.lastname"
                                            backgroundColor={'white'}
                                            onChangeText={setEmail}
                                        />
                                        <InputRightAddon
                                            w={{
                                                base: '40%',
                                                md: '100%',
                                            }}
                                            children={'@etu.univ-lyon1.fr'}
                                        />
                                    </InputGroup>
                                </Stack>
                            </FormControl>
                            <FormControl isRequired isInvalid mb={4}>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    w={{
                                        base: '100%',
                                    }}
                                    type="password"
                                    placeholder="Enter your password"
                                    backgroundColor={'white'}
                                    onChangeText={setPassword}
                                />
                            </FormControl>
                            <Skeleton isLoaded={isFetching === false}>
                                <Button
                                    colorScheme="primary"
                                    onPress={() => login()}>
                                    Login
                                </Button>
                            </Skeleton>
                        </VStack>
                        <Link mx="auto" onPress={() => setRegisterIsOpen(true)}>
                            No account yet? Sign Up!
                        </Link>
                        <RegisterModal
                            isOpen={registerIsOpen}
                            onClose={() => {
                                setRegisterIsOpen(false);
                                // onLogin(true);
                            }}
                            register={register}
                            isFetching={isRegisterFetching}
                        />
                    </Box>
                    <Divider my="5" />
                    <Box>
                        <Heading mb="3" mx="auto">
                            ... or with your student card
                        </Heading>
                        <Button
                            colorScheme="primary"
                            onPress={() => navigate(Screens.Main)}>
                            {listening
                                ? 'Stop listening'
                                : 'Login with student card'}
                        </Button>
                    </Box>
                </Center>
            </Box>
        </View>
    );
};

export default Login;
