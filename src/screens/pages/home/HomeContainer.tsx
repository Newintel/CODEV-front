import { ScrollView, Spinner, Text, View } from 'native-base';
import React, { useEffect } from 'react';
import { FetchResources } from '../../../api/FetchResources';
import RoomCard from '../../../components/RoomCard';
import useFetchResources from '../../../hooks/useFetchResources';

const HomeContainer = () => {
    const { data, isFetching, fetchData } = useFetchResources({
        resource: FetchResources.EMPTY_ROOMS,
        method: 'GET',
    });

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <View>
            <Text>Free rooms</Text>
            <ScrollView>
                {isFetching && <Spinner size={'lg'}>Loading</Spinner>}
                {data
                    ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((room, id) => (
                        <RoomCard key={id} room={room} />
                    ))}
            </ScrollView>
        </View>
    );
};

export default HomeContainer;
