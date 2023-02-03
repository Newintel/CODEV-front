enum E_Storage {
    TOKEN = 'token',
}

export type T_StorageType = {
    [E_Storage.TOKEN]: string;
};

export default E_Storage;
