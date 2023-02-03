import {
    Center,
    CheckIcon,
    FormControl,
    Heading,
    HStack,
    Input,
    InputRightAddon,
    Skeleton,
    View,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import useFetchResources from '../../../hooks/useFetchResources';
import { FetchResources, Methods } from '../../../api/FetchResources';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

const UserModifyForm = () => {
    const {
        data: user,
        fetchData: getUser,
        isFetching,
        isFetched,
    } = useFetchResources({
        resource: FetchResources.GET_USER,
        method: Methods.GET,
    });

    const {
        fetchData: _modifyUser,
        isFetching: isFetchingModify,
        isFetched: isFetchedModify,
    } = useFetchResources({
        resource: FetchResources.USERS,
        method: Methods.PUT,
    });

    const modifyUser = useCallback<typeof _modifyUser>(
        async _user => {
            const newUser = {
                ...user,
                ..._user,
            };

            if (_.isEqual(user, newUser)) {
                return;
            }

            await _modifyUser({
                ...user,
            });
        },
        [_modifyUser, user]
    );

    const [modifyFirstName, setModifyFirstName] = useState(false);
    const [modifyLastName, setModifyLastName] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (isFetchedModify) {
            getUser();
        }
    }, [isFetchedModify, getUser]);
    return (
        <View>
            <Center>
                <Heading mb="3">My Account</Heading>
                <FormControl alignItems="center">
                    <FormControl.Label>Email</FormControl.Label>
                    <Skeleton
                        isLoaded={
                            (isFetching || isFetchingModify) === false &&
                            (isFetched || isFetchedModify)
                        }>
                        <Input
                            w="75%"
                            type="text"
                            textAlign="center"
                            value={user?.email}
                            isReadOnly
                        />
                    </Skeleton>
                </FormControl>
                <FormControl alignItems="center">
                    <FormControl.Label>First Name</FormControl.Label>
                    <Skeleton isLoaded={isFetching === false && isFetched}>
                        <HStack>
                            <Input
                                w="50%"
                                type="text"
                                textAlign="center"
                                defaultValue={user?.firstname}
                                isReadOnly={modifyFirstName === false}
                                onTextInput={e =>
                                    setFirstname(e.nativeEvent.text)
                                }
                            />
                            <InputRightAddon
                                backgroundColor={
                                    modifyFirstName
                                        ? 'success.500'
                                        : 'primary.500'
                                }
                                onTouchEnd={() => {
                                    if (modifyFirstName) {
                                        setModifyFirstName(false);
                                        modifyUser({
                                            firstname,
                                        });
                                    }
                                    setModifyFirstName(
                                        modifyFirstName === false
                                    );
                                }}>
                                {modifyFirstName ? (
                                    <CheckIcon color="white" />
                                ) : (
                                    <Icon
                                        name="pencil-outline"
                                        size={20}
                                        color="white"
                                    />
                                )}
                            </InputRightAddon>
                        </HStack>
                    </Skeleton>
                </FormControl>
                <FormControl alignItems="center">
                    <FormControl.Label>Last Name</FormControl.Label>
                    <Skeleton isLoaded={isFetching === false && isFetched}>
                        <HStack>
                            <Input
                                w="50%"
                                type="text"
                                textAlign="center"
                                value={user?.lastname}
                                isReadOnly={modifyLastName === false}
                                onTextInput={e =>
                                    setLastname(e.nativeEvent.text)
                                }
                            />
                            <InputRightAddon
                                backgroundColor={
                                    modifyLastName
                                        ? 'success.500'
                                        : 'primary.500'
                                }
                                onTouchEnd={() => {
                                    if (modifyLastName) {
                                        setModifyLastName(false);
                                        modifyUser({
                                            lastname,
                                        });
                                    }
                                    setModifyLastName(modifyLastName === false);
                                }}>
                                {modifyLastName ? (
                                    <CheckIcon color="white" />
                                ) : (
                                    <Icon
                                        name="pencil-outline"
                                        size={20}
                                        color="white"
                                    />
                                )}
                            </InputRightAddon>
                        </HStack>
                    </Skeleton>
                </FormControl>
            </Center>
        </View>
    );
};

export default UserModifyForm;
