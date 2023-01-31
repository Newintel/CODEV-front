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
    Spinner,
    Square,
    Stack,
    Toast,
    View,
    VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { FetchResources } from '../../../api/FetchResources';
import RegisterModal from '../../../components/RegisterModal';
import E_Screens from '../../screens';
import { AppState } from 'react-native';
import useFetchResources from '../../../hooks/useFetchResources';
import getLoginError from '../../../utils/getLoginError';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import E_Storage from '../../../storage/storage';
import { useCallback } from 'react';
import useNfcManager from '../../../hooks/useNfcManager';
import useAppNavigation from '../../../hooks/useAppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '../../../storage/redux/actions/auth';
import AuthSelectors from '../../../storage/redux/selectors/auth';
import { I_LinkRegister } from '../../../api/resources/auth';

const Login = () => {
    const { getState, reset } = useAppNavigation();

    const { setItem, getItem, removeItem } = useEncryptedStorage();

    const { launchTag, readTag, readNfc, isReading } = useNfcManager();

    const dispatch = useDispatch();

    const hasLoggedOut = useSelector(AuthSelectors.hasLoggedOut);
    const isLogged = useSelector(AuthSelectors.logged);

    const [registerIsOpen, setRegisterIsOpen] = useState(false);
    const [stateParams, setStateParams] =
        useState<Readonly<I_LinkRegister | undefined>>();

    const appStateChangedCallback = React.useCallback(
        (nextAppState: string) => {
            if (nextAppState === 'active') {
                setStateParams(
                    getState().routes.find(
                        route => route.name === E_Screens.Login
                    )?.params?.auth_message
                );
            }
        },
        [getState]
    );

    useEffect(() => {
        appStateChangedCallback(AppState.currentState);
    }, [appStateChangedCallback]);

    AppState.addEventListener('change', appStateChangedCallback);

    const {
        data: token,
        fetchData: _login,
        isFetching: isLoginFetching,
    } = useFetchResources({
        resource: FetchResources.LOGIN,
        method: 'POST',
    });

    const {
        data: nfcToken,
        fetchData: nfcLogin,
        isFetching: isNfcLoginFetching,
    } = useFetchResources({
        resource: FetchResources.LOGIN_NFC,
        method: 'POST',
    });

    const {
        data: registerData,
        fetchData: register,
        isFetching: isRegisterFetching,
        isFetched: isRegisterFetched,
    } = useFetchResources({
        resource: FetchResources.SIGNUP,
        method: 'POST',
    });

    const {
        fetchData: checkValidToken,
        data: tokenIsValid,
        isError: tokenIsInvalid,
    } = useFetchResources({
        resource: FetchResources.CHECK_TOKEN,
        method: 'GET',
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

    const setToken = useCallback(
        (tok: string) => {
            setItem({
                key: E_Storage.TOKEN,
                value: tok,
                onSuccess: () => dispatch(AuthActions.login()),
            });
        },
        [setItem, dispatch]
    );

    useEffect(() => {
        if (isLogged) {
            reset({
                index: 0,
                routes: [{ name: E_Screens.Main }],
            });
        }
    }, [isLogged, reset]);

    useEffect(() => {
        if (readTag?.id !== undefined) {
            nfcLogin({
                nfc: readTag.id,
            });
        }
    }, [nfcLogin, readTag?.id]);

    useEffect(() => {
        if (launchTag?.id !== undefined && hasLoggedOut === false) {
            nfcLogin({
                nfc: launchTag.id,
            });
        } else {
            getItem({
                key: E_Storage.TOKEN,
                onSuccess: tok => {
                    if (tok) {
                        checkValidToken();
                    }
                },
            });
        }
    }, [checkValidToken, getItem, nfcLogin, launchTag?.id, hasLoggedOut]);

    useEffect(() => {
        if (nfcToken !== undefined) {
            setToken(nfcToken);
        }
    }, [nfcToken, setToken]);

    useEffect(() => {
        if (tokenIsValid?.valid) {
            dispatch(AuthActions.login());
        } else if (tokenIsInvalid) {
            removeItem({
                key: E_Storage.TOKEN,
            });
        }
    }, [dispatch, removeItem, tokenIsInvalid, tokenIsValid?.valid]);

    useEffect(() => {
        if (token !== undefined) {
            setToken(token);
        }
    }, [setToken, token]);

    useEffect(() => {
        if (stateParams) {
            if (stateParams.error) {
                Toast.show({
                    title: 'Error',
                    description:
                        getLoginError(stateParams.error_code) ??
                        stateParams.error_description?.split('+').join(' '),
                    duration: 5000,
                });
            }

            if (stateParams.access_token) {
                setToken(stateParams.access_token);
            }
        }
    }, [isRegisterFetched, setToken, stateParams]);

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
                            <Skeleton isLoaded={isLoginFetching === false}>
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
                            }}
                            register={register}
                            isFetching={isRegisterFetching}
                            registerData={registerData}
                        />
                    </Box>
                    <Divider my="5" />
                    <Box>
                        <Heading mb="3" mx="auto">
                            ... or with your student card
                        </Heading>
                        {isNfcLoginFetching ? (
                            <Spinner>Loading</Spinner>
                        ) : (
                            <Button
                                colorScheme="primary"
                                onPress={() => {
                                    readNfc();
                                }}>
                                {isReading
                                    ? 'Stop reading'
                                    : 'Login with student card'}
                            </Button>
                        )}
                    </Box>
                    <Divider my="5" />
                    <Heading mb="3" mx="auto">
                        Or continue as a guest
                    </Heading>
                    <Button
                        colorScheme="primary"
                        onPress={() => {
                            reset({
                                index: 0,
                                routes: [{ name: E_Screens.Main }],
                            });
                        }}>
                        Continue as a guest
                    </Button>
                </Center>
            </Box>
        </View>
    );
};

export default Login;
