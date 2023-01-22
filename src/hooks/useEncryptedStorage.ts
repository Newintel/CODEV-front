import { useCallback } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import E_Storage, { T_StorageType } from '../storage/storage';

interface I_Props<T extends E_Storage> {
    key: T;
    value: T_StorageType[T];
    onSuccess?: (value: string | null | void) => void;
    onFailure?: (reason: any) => void;
}

const useEncryptedStorage = () => {
    const getItem = useCallback(
        <T extends E_Storage>({
            key,
            onSuccess,
            onFailure,
        }: Omit<I_Props<T>, 'value'>) => {
            EncryptedStorage.getItem(key).then(onSuccess).catch(onFailure);
        },
        []
    );

    const setItem = useCallback(
        <T extends E_Storage>({
            key,
            value,
            onSuccess,
            onFailure,
        }: I_Props<T>) => {
            EncryptedStorage.setItem(key, JSON.stringify(value))
                .then(onSuccess)
                .catch(onFailure);
        },
        []
    );

    const removeItem = useCallback(
        <T extends E_Storage>({
            key,
            onSuccess,
            onFailure,
        }: Omit<I_Props<T>, 'value'>) => {
            EncryptedStorage.removeItem(key).then(onSuccess).catch(onFailure);
        },
        []
    );

    const clearStorage = useCallback(
        (onSuccess: () => void, onFailure: (reason: any) => void) => {
            EncryptedStorage.clear().then(onSuccess).catch(onFailure);
        },
        []
    );

    return { getItem, setItem, removeItem, clearStorage };
};

export default useEncryptedStorage;
