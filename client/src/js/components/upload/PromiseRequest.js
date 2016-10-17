

export default class PromiseRequest {

    get(url, data) {
        return this.request('GET', url, data);
    }

    post(url, data) {
        return this.request('POST', url, data);
    }

    request(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.open(method, url);
            
            xhr.onload = () => {
                let json;
                if (xhr.response) {
                    json = JSON.parse(xhr.response);
                }
                if (xhr.status === 200) {
                    resolve(json, xhr);
                } else {
                    reject(new Error(xhr.response));
                }
            };

            xhr.onerror = reject;

            if (data) {
                xhr.send(data);
            } else {
                xhr.send();
            }
        });
    }
}
