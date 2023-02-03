import { Actionsheet, HStack, Text, Toast } from 'native-base';
import React, { useEffect, useMemo } from 'react';
import { I_User } from '../../../api/resources/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FetchResources, Methods } from '../../../api/FetchResources';
import useFetchResources from '../../../hooks/useFetchResources';

interface I_Props {
    isOpen: boolean;
    onClose: () => void;
    user: I_User | undefined;
}

const UserActionsModal = (props: I_Props) => {
    const { isOpen, onClose, user } = props;

    const {
        fetchData: send,
        isFetched,
        isError,
    } = useFetchResources({
        resource: FetchResources.FRIENDS,
        method: Methods.POST,
    });

    const sendFriendRequest = useMemo(() => {
        if (user) {
            return () => send({ id: user.id });
        }
    }, [send, user]);

    useEffect(() => {
        if (isFetched) {
            Toast.show({
                title: 'Friend request sent',
            });
            onClose();
        }
    }, [isFetched, onClose]);

    useEffect(() => {
        if (isError && isFetched === false) {
            Toast.show({
                title: 'Error',
                description: 'Failed to send friend request',
            });
            onClose();
        }
    });

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Actionsheet.Item onPress={sendFriendRequest}>
                    <HStack>
                        <Icon name="account-plus" size={25} />
                        <Text ml="5">Send friend request</Text>
                    </HStack>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default UserActionsModal;
