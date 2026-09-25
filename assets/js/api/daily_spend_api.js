import { fetchJson, stringifyUrl } from "./request.js";

const apiUrl = '/api/v1/x9f2w7ta8/b3y1s';

export function getDailySpends(conditions, terminal) {

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

export function createDailySpend(requestData) {

    return fetchJson(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json',
            'Accept': 'application/ld+json',
        }
    });
}

export function getDailySpend(id, terminal) {

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

export function deleteDailySpend(requestData, id) {
    return fetchJson(apiUrl + "/" + id, {
        method: 'DELETE',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/ld+json'
        }
    });
}

export function updateDailySpend(requestData, id) {
    return fetchJson(apiUrl + "/" + id, {
        method: 'PATCH',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/merge-patch+json'
        }
    });
}
