import { Box, Center, Divider, Heading, ScrollView, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FetchResources, Methods } from '../../../api/FetchResources';
import useFetchResources from '../../../hooks/useFetchResources';
import UserActions, {
    E_FriendActions,
} from '../../../components/usersList/UserActions';
import UsersListItem from '../../../components/usersList/UsersListItem';

const FriendRequests = () => {
    const {
        data: received,
        fetchData: getReceived,
        isFetching: isFetchingReceived,
    } = useFetchResources({
        resource: FetchResources.FRIENDS_REQUESTS,
        method: Methods.GET,
    });

    const {
        data: sent,
        fetchData: getSent,
        isFetching: isFetchingSent,
    } = useFetchResources({
        resource: FetchResources.FRIENDS_REQUESTS_SENT,
        method: Methods.GET,
    });

    const { fetchData: acceptFriend, isFetched } = useFetchResources({
        resource: FetchResources.FRIENDS,
        method: Methods.PUT,
    });

    const { fetchData: cancelRequest, isFetched: isFetchedCancel } =
        useFetchResources({
            resource: FetchResources.FRIENDS,
            method: Methods.DELETE,
        });

    useEffect(() => {
        getReceived();
    }, [getReceived]);

    useEffect(() => {
        if (isFetched) {
            getReceived();
        }
    }, [isFetched, getReceived]);

    useEffect(() => {
        getSent();
    }, [getSent]);

    useEffect(() => {
        if (isFetchedCancel) {
            getSent();
        }
    }, [isFetchedCancel, getSent]);

    const receivedActions = [E_FriendActions.ACCEPT, E_FriendActions.DECLINE];

    const sentActions = [E_FriendActions.CANCEL_REQUEST];

    return (
        <Center h="95%">
            <VStack h="100%" w="100%">
                <Heading textAlign={'center'} my="2">
                    Friend Requests
                </Heading>
                <Box bg="white" safeArea flex="1" w="100%" h="48%">
                    {received?.length ? (
                        <SwipeListView
                            data={received}
                            renderItem={UsersListItem}
                            renderHiddenItem={(...props) =>
                                UserActions({
                                    actions: receivedActions,
                                    itemProps: props,
                                    friendDecision: (id, accepted) =>
                                        acceptFriend({ id, accepted }),
                                })
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetchingReceived}
                                    onRefresh={getReceived}
                                />
                            }
                            rightOpenValue={-60 * receivedActions.length}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                        />
                    ) : (
                        <ScrollView
                            h="100%"
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetchingReceived}
                                    onRefresh={getReceived}
                                />
                            }>
                            <Center flex="1">
                                <Heading>No received friend requests</Heading>
                            </Center>
                        </ScrollView>
                    )}
                </Box>
                <Divider my={1} />
                <Box bg="white" safeArea flex="1" w="100%" h="48%">
                    {sent?.length ? (
                        <SwipeListView
                            data={sent}
                            renderItem={UsersListItem}
                            renderHiddenItem={(...props) =>
                                UserActions({
                                    actions: sentActions,
                                    itemProps: props,
                                    deleteFriend: id => cancelRequest({ id }),
                                })
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetchingSent}
                                    onRefresh={getSent}
                                />
                            }
                            rightOpenValue={-60 * sentActions.length}
                            previewOpenValue={-40}
                            previewOpenDelay={3000}
                        />
                    ) : (
                        <ScrollView
                            h="100%"
                            refreshControl={
                                <RefreshControl
                                    refreshing={isFetchingSent}
                                    onRefresh={getSent}
                                />
                            }>
                            <Center flex="1">
                                <Heading>No sent friend requests</Heading>
                            </Center>
                        </ScrollView>
                    )}
                </Box>
            </VStack>
        </Center>
    );
};

export default FriendRequests;
