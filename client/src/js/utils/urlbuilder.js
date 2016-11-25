
const BASE_URL = 'http://localhost:4001/image';

export default class UrlBuilder {
    static generateUrl(image, filter, args) {
        const cache = new Date().getTime();
        let url = BASE_URL;
        if (args) {
            //
        }
        if (filter) {
            url += `/${filter}`;
        }
        if (!image) {
            throw Error('UrlBuilder.generateUrl must have an image');
        }
        url += `/${image}`;

        return `${url}?${cache}`;
    }
}
