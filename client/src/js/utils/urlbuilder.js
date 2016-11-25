
const BASE_URL = 'http://localhost:4001/image';

export default class UrlBuilder {
    static generateUrl(image, filter, args) {
        const cache = new Date().getTime();
        let url = BASE_URL;
        if (filter) {
            url += `/${filter}`;
        }
        if (args) {
            url += `/${UrlBuilder.stringify(args)}`;
        }
        if (!image) {
            throw Error('UrlBuilder.generateUrl must have an image');
        }
        url += `/${image}`;

        return `${url}?${cache}`;
    }

    static stringify(args) {
        let result = '';

        Object.entries(args).forEach((entry) => {
            result += `${entry[0]}=${entry[1]}`;
        });

        return result;
    }
}
