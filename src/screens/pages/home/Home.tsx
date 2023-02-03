import _ from 'lodash';
import moment from 'moment';
import { Center, Heading, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { FetchResources, Methods } from '../../../api/FetchResources';
import RoomCard from './RoomCard';
import useFetchResources from '../../../hooks/useFetchResources';

const Home = () => {
    const {
        data: _data,
        isFetching,
        fetchData,
        setUrlParams,
    } = useFetchResources({
        resource: FetchResources.EMPTY_ROOMS,
        method: Methods.GET,
    });

    const update = useCallback(() => {
        setUrlParams({ time: moment().toISOString() });
    }, [setUrlParams]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const data = useMemo(() => {
        return _.sortBy(_data ?? [], 'edges.rooms.name');
    }, [_data]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={update} />
            }>
            <Center>
                <Heading my="2">Free rooms</Heading>
            </Center>
            {data.map((room, id) => (
                <RoomCard key={id} room={room} />
            ))}
        </ScrollView>
    );
};

export default Home;
