const capitalize = (str: string | undefined) => {
    if (str === undefined) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;
