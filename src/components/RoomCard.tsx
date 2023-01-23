import moment, { duration } from 'moment';
import { Box, Divider, Text } from 'native-base';
import React, { useMemo } from 'react';
import { I_Room } from '../api/resources/room';

interface I_Props {
    room: I_Room;
}

const RoomCard = (props: I_Props) => {
    const {
        room: { name, freeTime },
    } = props;

    const currentTime = useMemo(() => moment(), []);
    const endTime = useMemo(
        () =>
            currentTime.add(
                duration({
                    minutes: freeTime,
                })
            ),
        [currentTime, freeTime]
    );

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
