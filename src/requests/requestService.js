import { KEY_1, trendingEndpoint } from '../data/api.js';


export const getTrendingGifs = async () => {
    const response = await fetch(trendingEndpoint(KEY_1));

    return response.json();
};
