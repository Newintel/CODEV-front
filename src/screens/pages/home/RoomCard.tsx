import moment from 'moment';
import { Divider, Pressable, Text, VStack } from 'native-base';
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
                rooms: { name },
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
                <Text textAlign={'center'}>{name}</Text>
                <Divider />
                <Text>{`Free until ${endTime.format('LT')}`}</Text>
            </VStack>
        </Pressable>
    );
};

export default RoomCard;
