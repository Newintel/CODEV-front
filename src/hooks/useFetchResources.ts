import { useCallback, useState } from 'react';
import useConfig from './useConfig';
import {
    ResourceReturns,
    ResourceParams,
    FetchResourcesCallback,
} from '../api/FetchResources';
import { FetchResources, ResourceMethods } from '../api/FetchResources';
import useEncryptedStorage from './useEncryptedStorage';
import E_Storage from '../storage/storage';

interface I_Props<R extends FetchResources> {
    resource: R;
    method: ResourceMethods<R>;
}

const useFetchResources = <R extends FetchResources>(props: I_Props<R>) => {
    const { resource, method } = props;

    const [data, setData] = useState<ResourceReturns<R>>();
    const [isFetching, setIsFetching] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isError, setIsError] = useState(false);

    const { api_url } = useConfig();

    const { getItem } = useEncryptedStorage();

    const fetchData = useCallback<FetchResourcesCallback<R>>(
        async (body?: ResourceParams<R>) => {
            setIsFetching(true);
            setIsError(false);
            setIsFetched(false);
            const token: string = await getItem({
                key: E_Storage.TOKEN,
                onSuccess: value => value,
            });
            const headers = token
                ? { Authorization: `Bearer ${token}` }
                : undefined;

            await fetch(`${api_url}/${resource}`, {
                method,
                body: JSON.stringify(body),
                headers,
            })
                .then(async res => {
                    console.log(res);
                    if (res.ok) {
                        res.json().then(json => {
                            setData(json);
                            setIsFetched(true);
                        });
                    } else {
                        setIsError(true);
                    }
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        },
        [api_url, getItem, method, resource]
    );

    return { data, isFetching, fetchData, isFetched, isError };
};

export default useFetchResources;
