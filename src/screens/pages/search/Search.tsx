import {
    Box,
    Center,
    FlatList,
    Heading,
    Input,
    Pressable,
    ScrollView,
    useDisclose,
} from 'native-base';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ListRenderItemInfo, RefreshControl } from 'react-native';
import { FetchResources, Methods } from '../../../api/FetchResources';
import { I_User } from '../../../api/resources/user';
import UsersListItem from '../../../components/usersList/UsersListItem';
import useFetchResources from '../../../hooks/useFetchResources';
import UserActionsModal from './UserActionsModal';

const PressableUserListInput =
    (onClick: (user: I_User) => void) => (info: ListRenderItemInfo<I_User>) => {
        return (
            <Pressable onPress={() => onClick(info.item)}>
                {UsersListItem(info, {})}
            </Pressable>
        );
    };

const Search = () => {
    const {
        data: _users,
        fetchData: getUsers,
        isFetching: usersIsFetching,
        setUrlParams,
    } = useFetchResources({
        resource: FetchResources.USERS,
        method: Methods.GET,
    });

    const { fetchData: getMe, data: me } = useFetchResources({
        resource: FetchResources.GET_USER,
        method: Methods.GET,
    });

    const [selectedUser, setSelectedUser] = React.useState<I_User>();

    const { isOpen, onOpen, onClose } = useDisclose();

    const onUserClick = useCallback(
        (user: I_User) => {
            setSelectedUser(user);
            onOpen();
        },
        [onOpen]
    );

    const users = useMemo(
        () => _users?.filter(user => user.id !== me?.id),
        [me?.id, _users]
    );

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        getMe();
    }, [getMe]);

    return (
        <Center h="95%">
            <UserActionsModal
                user={selectedUser}
                isOpen={isOpen}
                onClose={onClose}
            />
            <Heading>Search</Heading>
            <Input
                my="2"
                bg="white"
                w="75%"
                type="text"
                placeholder="Search a user"
                onChangeText={name => {
                    setUrlParams({
                        name,
                    });
                    getUsers();
                }}
            />

            <Box bg="white" safeArea flex="1" w="100%">
                {users?.length ? (
                    <FlatList
                        data={users}
                        renderItem={PressableUserListInput(onUserClick)}
                        refreshControl={
                            <RefreshControl
                                refreshing={usersIsFetching}
                                onRefresh={getUsers}
                            />
                        }
                    />
                ) : (
                    <ScrollView
                        h="100%"
                        refreshControl={
                            <RefreshControl
                                refreshing={usersIsFetching}
                                onRefresh={getUsers}
                            />
                        }>
                        <Center flex="1">
                            <Heading>No results found</Heading>
                        </Center>
                    </ScrollView>
                )}
            </Box>
        </Center>
    );
};

export default Search;
