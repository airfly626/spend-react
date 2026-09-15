import { apiUri } from '../config/config.js';

export async function fetchJson(url, options = {}) {

    const response = await fetch(apiUri + url, {
        ...options,
        headers: {
            ...options.headers
        }
    });


    if (!response.ok) {
        const error = new Error(response.statusText || `HTTP error! status: ${response.status}`);
        error.response = response;

        try {
            const errorText = await response.text();
            error.errorBody = JSON.parse(errorText);
        } catch {
            error.message = `伺服器錯誤: ${response.status}`;
            error.errorBody = null;
        }

        throw error;
    }


    if (response.status === 204) return null;

    const text = await response.text();
    if (!text) return null;


    try {
        const data = JSON.parse(text);

        return data;
    } catch (e) {
        alert('連線或非驗證型錯誤');
        console.error('連線或非驗證型錯誤:', e);
        throw new Error('連線或非驗證型錯誤');
    }
}

export function stringifyUrl(param) {
    const url = param.url ?? "";
    const query = param.query ?? {};

    let stringQuery = {};
    let arrayQuery = {};

    if (param.query) {
        for (let [key, value] of Object.entries(param.query)) {
            if (!Array.isArray(value)) {
                stringQuery[key] = value;
            }
            else {
                arrayQuery[key] = value;
            }
        }
    }

    const urlParmas = new URLSearchParams(Object.entries(stringQuery));
    for (let [key, queries] of Object.entries(arrayQuery)) {
        for (let query of queries) {
            urlParmas.append(key, query);
        }
    }

    return url + "?" + urlParmas.toString();
}

export async function handleSubmitError(error, AutoSnackbar, setFormError) {
    const status = error.response?.status;

    if (status === 400 || status === 422) {
        AutoSnackbar('資料輸入錯誤', 'error');

        const violations = error.errorBody?.violations ?? [];

        for (const violation of violations) {
            setFormError(prev => {

                return recursiveReplaceValueByName(
                    violation.propertyPath,
                    prev,
                    violation.message
                )
            });
        }
    }
    else {
        alert('連線處理錯誤，請聯絡管理員');
        console.log(
            '連線處理錯誤，請聯絡管理員,'
            + error +
            ',代碼:' + (status ?? ""),
            'error'
        );
    }
}

export function recursiveReplaceValueByName(name, object, value) {

    var keysArr = "";
    if (name) {
        keysArr = name.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    }

    var target = object;

    for (var i = 0; i < keysArr.length; i++) {
        let key = keysArr[i];

        if (Object.hasOwn(key)) {
            return object;
        }

        if (i == keysArr.length - 1) {
            target[key] = value;
        }

        target = target[key];
    }

    return object;
}