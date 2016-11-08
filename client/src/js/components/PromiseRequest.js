

export default class PromiseRequest {

    constructor(type = 'json') {
        this.type = type;
    }

    get(url, data) {
        return this.request('GET', url, data);
    }

    post(url, data) {
        return this.request('POST', url, data);
    }

    request(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = this.type;

            xhr.open(method, url);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response, xhr);
                } else {
                    reject(new Error(xhr.response));
                }
            };

            if (this.progressHandler) {
                xhr.upload.onprogress = this.progressHandler;
            }

            xhr.onerror = reject;

            if (data) {
                xhr.send(data);
            } else {
                xhr.send();
            }
        });
    }

    onProgress(callback) {
        this.progressHandler = callback;
    }
}
