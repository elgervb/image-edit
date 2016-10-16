

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
                if (xhr.status === 200) {
                    resolve(xhr);
                } else {
                    reject(new Error(xhr, `XMLHttpRequest failed; error code: ${xhr.statusText}`));
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
