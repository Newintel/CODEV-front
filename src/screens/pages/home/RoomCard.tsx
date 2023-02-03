import moment from 'moment';
import { Center, Divider, HStack, Pressable, Text, VStack } from 'native-base';
import React, { useMemo } from 'react';
import { I_Room } from '../../../api/resources/room';

interface I_Props {
    room: I_Room;
}

const RoomCard = (props: I_Props) => {
    const {
        room: {
            end,
            edges: {
                rooms: { name, floor, building },
            },
        },
    } = props;

    const endTime = useMemo(() => moment(end), [end]);

    return (
        <Pressable
            width="75%"
            textAlign="center"
            backgroundColor="red.300"
            alignSelf="center"
            rounded="md"
            my="3"
            borderWidth={1}>
            <VStack>
                <Center>
                    <HStack>
                        <Text textAlign={'center'} mr="2">
                            {building}
                        </Text>
                        <Text textAlign={'center'}>{name}</Text>
                    </HStack>
                </Center>
                <Divider />
                <HStack flex="1" justifyContent={'space-between'}>
                    <Text textAlign={'center'} ml="2">
                        Floor: {floor}
                    </Text>
                    <Text mr="2">{`Free until ${endTime.format('LT')}`}</Text>
                </HStack>
            </VStack>
        </Pressable>
    );
};

export default RoomCard;
