import { Box, Center, Heading, ScrollView } from 'native-base';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FetchResources, Methods } from '../../../api/FetchResources';
import useFetchResources from '../../../hooks/useFetchResources';
import UserActions, {
    E_FriendActions,
} from '../../../components/usersList/UserActions';
import UsersListItem from '../../../components/usersList/UsersListItem';

const Friends = () => {
    const {
        data: friends,
        fetchData: getFriends,
        isFetching,
    } = useFetchResources({
        resource: FetchResources.FRIENDS,
        method: Methods.GET,
    });

    const { fetchData: deleteFriend, isFetched } = useFetchResources({
        resource: FetchResources.FRIENDS,
        method: Methods.DELETE,
    });

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    useEffect(() => {
        if (isFetched) {
            getFriends();
        }
    }, [isFetched, getFriends]);

    return (
        <Center h="95%">
            <Heading>Friends</Heading>
            <Box bg="white" safeArea flex="1" w="100%">
                {friends?.length ? (
                    <SwipeListView
                        data={friends}
                        renderItem={UsersListItem}
                        renderHiddenItem={(...props) =>
                            UserActions({
                                actions: [E_FriendActions.REMOVE_FRIEND],
                                itemProps: props,
                                deleteFriend: id => deleteFriend({ id }),
                            })
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={getFriends}
                            />
                        }
                        rightOpenValue={-60}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                    />
                ) : (
                    <ScrollView
                        h="100%"
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={getFriends}
                            />
                        }>
                        <Center flex="1">
                            <Heading>No friends yet</Heading>
                        </Center>
                    </ScrollView>
                )}
            </Box>
        </Center>
    );
};

export default Friends;
