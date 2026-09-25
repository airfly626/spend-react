import { fetchJson, stringifyUrl } from "./request.js";

const apiUrl = '/api/v2/MjAyNjA5MjU/c9a1s';

export function getSpendCategories(conditions, terminal) {

    const url = stringifyUrl({
        url: apiUrl,
        query: conditions
    });

    return fetchJson(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function createSpendCategory(requestData) {

    return fetchJson(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function getSpendCategory(id, terminal) {

    const url = stringifyUrl({
        url: apiUrl + "/" + id,
    });

    return fetchJson(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function deleteSpendCategory(requestData, id) {
    return fetchJson(apiUrl + "/" + id, {
        method: 'DELETE',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function updateSpendCategory(requestData, id) {
    return fetchJson(apiUrl + "/" + id, {
        method: 'PATCH',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        }
    });
}
