import { Box, HStack, Text, VStack, Divider } from 'native-base';
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { I_User } from '../../../api/resources/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FriendListItem: NonNullable<
    SwipeListView<I_User>['props']['renderItem']
> = ({ item }) => {
    return (
        <Box bgColor="white">
            <HStack px={4} py={2} alignItems="center" space={3}>
                <VStack>
                    <HStack>
                        <Text bold mr="1">
                            {item.lastname ??
                                item.email.split('@')[0].split('.')[1]}
                        </Text>
                        <Text bold>
                            {item.firstname ?? item.email.split('.')[0]}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon name="email" size={22} />
                        <Text color="gray.500" ml="2">
                            {item.email}
                        </Text>
                    </HStack>
                    <HStack>
                        <Icon name="identifier" size={25} />
                        <Text color="gray.500" ml="2">
                            {item.id}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
            <Divider />
        </Box>
    );
};

export default FriendListItem;
