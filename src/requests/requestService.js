import { KEY_1, KEY_2, trendingEndpoint, singleGifEndpoint } from '../data/api.js';


export const getTrendingGifs = async () => {
    const response = await fetch(trendingEndpoint(KEY_1));

    return response.json();
};


export const getGifById = async (id) => {
    try {
        const response = await fetch(singleGifEndpoint(KEY_2, id));
        if (!response.ok) throw new Error('Failed to fetch GIF by ID');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error in getGifById:', error);
        return null;
    }
};
