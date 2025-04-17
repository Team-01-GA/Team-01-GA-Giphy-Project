import { GIF_LIMIT } from '../common/constants.js';
import { KEY_1, KEY_2, trendingEndpoint, singleGifEndpoint, searchEndpoint, uploadEndpoint, multipleGifsEndpoint, randomEndpoint } from '../data/api.js';


export const getTrendingGifs = async () => {
    try {
        const response = await fetch(`${trendingEndpoint(KEY_1)}&limit=${GIF_LIMIT}`);
        if (!response.ok) throw new Error('Failed to fetch trending GIFs');

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error in getTrendingGifs:', error);
        return null;
    }
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

export const getGifsByQuery = async (query) => {
    try {
        const response = await fetch(`${searchEndpoint(KEY_2)}&q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch GIFs by query');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error in getGifsByQuery:', error);
        return null;
    }
};

export const uploadGifToServer = async (formData) => {
    try {
        formData.append('api_key', KEY_1);
        const response = await fetch(uploadEndpoint, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Failed to upload GIF to server');

        const data = await response.json();
        alert('Success!');
        return data.data.id;
    } catch (error) {
        console.error('Error in uploadGifToServer:', error);
        return null;
    }
};


export const getMultipleGifsByIds = async (ids) => {
    try {
        const response = await fetch(`${multipleGifsEndpoint(KEY_2, ids)}`);
        if (!response.ok) throw new Error('Failed to fetch GIFs by ids (multiple)');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error in getMultipleGifsByIds:', error);
        return null;
    }
};

export const getRandomGif = async () => {
    try {
        const response = await fetch(randomEndpoint(KEY_2));
        if (!response.ok) throw new Error('Failed to fetch random GIF');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error in getRandomGif:', error);
        return null;
    }
};
