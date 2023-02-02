import React from 'react';
import { Center, HStack, Pressable } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { I_User } from '../../../api/resources/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MapEnum } from '../../../utils';
import { ColorType } from 'native-base/lib/typescript/components/types';

export enum E_FriendActions {
    ADD_FRIEND = 'ADD_FRIEND',
    REMOVE_FRIEND = 'REMOVE_FRIEND',
    ACCEPT = 'ACCEPT',
    DECLINE = 'DECLINE',
    CANCEL_REQUEST = 'CANCEL_REQUEST',
}

interface I_Props {
    addFriend?: (id: string) => void;
    deleteFriend?: (id: string) => void;
    friendDecision?: (id: string, decision: boolean) => void;
    actions: E_FriendActions[];
    itemProps: Parameters<
        NonNullable<SwipeListView<I_User>['props']['renderHiddenItem']>
    >;
}

const IconName = MapEnum(E_FriendActions)({
    [E_FriendActions.ADD_FRIEND]: 'account-plus',
    [E_FriendActions.REMOVE_FRIEND]: 'account-minus',
    [E_FriendActions.ACCEPT]: 'check',
    [E_FriendActions.DECLINE]: 'close',
    [E_FriendActions.CANCEL_REQUEST]: 'account-remove',
    _: '',
});

const BgColor = MapEnum<typeof E_FriendActions, ColorType>(E_FriendActions)({
    [E_FriendActions.ADD_FRIEND]: 'primary.600',
    [E_FriendActions.REMOVE_FRIEND]: 'danger.600',
    [E_FriendActions.ACCEPT]: 'success.600',
    [E_FriendActions.DECLINE]: 'danger.600',
    [E_FriendActions.CANCEL_REQUEST]: 'danger.600',
    _: 'white',
});

const FriendActionCallback =
    ({ addFriend, deleteFriend, friendDecision }: I_Props) =>
    (action: E_FriendActions, id: string) =>
        MapEnum<typeof E_FriendActions, () => void>(E_FriendActions)({
            [E_FriendActions.ADD_FRIEND]: () => addFriend?.(id),
            [E_FriendActions.REMOVE_FRIEND]: () => deleteFriend?.(id),
            [E_FriendActions.ACCEPT]: () => friendDecision?.(id, true),
            [E_FriendActions.DECLINE]: () => friendDecision?.(id, false),
            [E_FriendActions.CANCEL_REQUEST]: () => deleteFriend?.(id),
            _: () => {},
        })(action);

const FriendActionWidget = (props: I_Props & { action: E_FriendActions }) => {
    const {
        actions,
        itemProps: [{ item: friend }],
        action,
    } = props;

    return (
        <Pressable
            onPress={FriendActionCallback(props)(action, friend.id)}
            ml={actions.indexOf(action) === 0 ? 'auto' : '0'}
            w="60"
            bgColor={BgColor(action)}
            h="100%">
            <Center h="100%">
                <Icon
                    name={IconName(action) as string}
                    size={20}
                    color="white"
                />
            </Center>
        </Pressable>
    );
};

const FriendActions = (props: I_Props) => {
    const { actions } = props;

    return (
        <HStack flex="1">
            {actions.map((action, item) => (
                <FriendActionWidget {...props} action={action} key={item} />
            ))}
        </HStack>
    );
};

export default FriendActions;
