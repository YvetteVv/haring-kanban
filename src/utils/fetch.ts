const baseUrl = 'http://207.148.29.45:5000';

const get = (path) => {
    return fetch(baseUrl + path).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.status.toString()));
        }
        return response.text();
    }).then((text) => {
        return Promise.resolve((JSON).parse(text));
    });
};

const put = (path, body) => {
    return fetch(
        baseUrl + path,
        {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        }
    ).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.status.toString()));
        }
        return response.text();
    }).then((text) => {
        return Promise.resolve((JSON).parse(text));
    });
}

const post = (path, body) => {
    return fetch(
        baseUrl + path,
        {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        }
    ).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.status.toString()));
        }
        return response.text();
    }).then((text) => {
        return Promise.resolve((JSON).parse(text));
    });
};

const del = (path) => {
    return fetch(baseUrl + path, {method: 'DELETE'}
    ).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(response.status.toString()));
        }
        return response.text();
    }).then((text) => {
        return Promise.resolve((JSON).parse(text));
    });
};

export {get, put, post, del};
