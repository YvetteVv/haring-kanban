export const type = {
    apiToken: 'apiToken'
};

export const creator = (type, value) => {
    return {
        type,
        value,
    };
};
