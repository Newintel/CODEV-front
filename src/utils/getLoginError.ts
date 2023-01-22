const getLoginError = (code: number | undefined) => {
    switch (code) {
        case 401:
            return 'Email link invalid or expired';
        default:
            return undefined;
    }
};

export default getLoginError;
