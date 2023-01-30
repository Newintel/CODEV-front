import { ScrollView, Spinner, Text } from 'native-base';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { FetchResources } from '../../../api/FetchResources';
import RoomCard from '../../../components/RoomCard';
import useFetchResources from '../../../hooks/useFetchResources';
const Home = () => {
    const { data, isFetching, fetchData } = useFetchResources({
        resource: FetchResources.EMPTY_ROOMS,
        method: 'GET',
    });

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={fetchData} />
            }>
            <Text>Free rooms</Text>
            {isFetching && <Spinner size={'lg'}>Loading</Spinner>}
            {data
                ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((room, id) => (
                    <RoomCard key={id} room={room} />
                ))}
        </ScrollView>
    );
};

export default Home;
