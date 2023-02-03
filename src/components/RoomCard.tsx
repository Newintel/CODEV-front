import moment from 'moment';
import { Box, Divider, Text } from 'native-base';
import React, { useMemo } from 'react';
import { I_Room } from '../api/resources/room';

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
        <Box
            width="75%"
            textAlign="center"
            backgroundColor="red.400"
            alignSelf="center"
            rounded="md"
            my="3"
            borderWidth={1}>
            <Text textAlign={'center'}>{name}</Text>
            <Divider />
            {`Free until ${endTime.format('LT')}`}
        </Box>
    );
};

export default RoomCard;
