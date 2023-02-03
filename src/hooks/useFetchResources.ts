import { useCallback, useMemo, useState } from 'react';
import useConfig from './useConfig';
import {
    ResourceReturns,
    ResourceParams,
    FetchResourcesCallback,
    ResourceUrlParams,
    ResourceHasUrlParams,
} from '../api/FetchResources';
import {
    FetchResources,
    ResourceMethods,
    ResourceFilter,
} from '../api/FetchResources';
import useEncryptedStorage from './useEncryptedStorage';
import E_Storage from '../storage/storage';

interface I_Props<R extends FetchResources, M extends ResourceMethods<R>> {
    resource: R;
    method: M;
    resource_params: ResourceHasUrlParams<R, M> extends true
        ? ResourceUrlParams<R, M>
        : never;
    reloadOnParamsChange?: boolean;
}

type T_Props<
    R extends FetchResources,
    M extends ResourceMethods<R>
> = ResourceHasUrlParams<R, M> extends true
    ? Required<I_Props<R, M>>
    : Omit<I_Props<R, M>, 'resource_params'>;

/**
 * @description
 * This hook is used to fetch resources from the API.
 * @param props.resource The resource to fetch.
 * @param props.method The method to use when fetching the resource.
 * @returns The data returned from the API.
 */
const useFetchResources = <
    R extends FetchResources,
    M extends ResourceMethods<R>
>(
    props: T_Props<R, M>
) => {
    const {
        resource,
        method,
        resource_params = undefined,
    } = props as I_Props<R, M>;

    const [data, setData] = useState<ResourceReturns<R, M>>();
    const [isFetching, setIsFetching] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isError, setIsError] = useState(false);
    const [urlParams, setUrlParams] = useState<ResourceFilter<R, M>>();

    const { api_url } = useConfig();

    const { getItem } = useEncryptedStorage();

    const resource_url = useMemo(() => {
        let _resource = resource.toString();
        const params = resource.match(/:\w+/g);
        if (params) {
            for (const param of params) {
                const name = param.slice(1) as keyof typeof resource_params;
                if (resource_params?.[name]) {
                    _resource = _resource.replace(
                        param,
                        `${resource_params[name]}`
                    );
                }
            }
        }
        return _resource;
    }, [resource, resource_params]);

    const resource_filters = useMemo(() => {
        if (urlParams) {
            const filters = (
                Object.entries(urlParams)
                    .map(([key, value]) =>
                        value ? `${key}=${value}` : undefined
                    )
                    .filter(t => t !== undefined) as string[]
            ).join('&');

            if (filters) {
                return `?${filters}`;
            }
        }
    }, [urlParams]);

    const fetchData = useCallback<FetchResourcesCallback<R, M>>(
        async (body?: ResourceParams<R, M>) => {
            setIsFetching(true);
            setIsError(false);
            setIsFetched(false);
            const token: string = await getItem({
                key: E_Storage.TOKEN,
                onSuccess: value => value && JSON.parse(value),
            });
            const headers = token
                ? {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  }
                : undefined;

            await fetch(`${api_url}/${resource_url}${resource_filters ?? ''}`, {
                method: method.toString(),
                body: JSON.stringify(body),
                headers,
            })
                .then(async res => {
                    if (res.ok) {
                        res.json()
                            .then(json => {
                                setData(json);
                                setIsFetched(true);
                            })
                            .catch(() => {
                                setIsFetched(true);
                                setIsError(true);
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
        [api_url, getItem, method, resource_filters, resource_url]
    );

    return { data, isFetching, fetchData, isFetched, isError, setUrlParams };
};

export default useFetchResources;
