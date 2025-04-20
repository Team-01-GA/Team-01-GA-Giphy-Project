import { GIF_LIMIT } from '../common/constants.js';
import { KEY_1, KEY_2, trendingEndpoint, singleGifEndpoint, searchEndpoint, uploadEndpoint, multipleGifsEndpoint, randomEndpoint } from '../data/api.js';

/**
 * Fetches trending GIFs from Giphy API.
 * @async
 * @return {Promise<Object[] | null>} Array of GIF objects or null on error.
 */
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

/**
 * Fetches a single GIF by ID from Giphy API.
 * @async
 * @param {string} id - The GIF ID to fetch.
 * @return {Promise<Object | null>} The GIF object or null on error.
 */
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

/**
 * Fetches GIFs matching a user search query from Giphy API.
 * @async
 * @param {string} query - The search string to query.
 * @return {Promise<Object[] | null>} Array of GIFs matching the query or null on error.
 */
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

/**
 * Uploads a GIF file to the Giphy server using the provided FormData.
 * @async
 * @param {FormData} formData - Form data including the GIF file.
 * @return {Promise<string | null>} Uploaded GIF ID or null on error.
 */
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

/**
 * Fetches multiple GIFs using an array of IDs from Giphy API.
 * @async
 * @param {string[]} ids - Array of GIF IDs.
 * @return {Promise<Object[] | null>} Array of GIF objects or null on error.
 */
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

/**
 * Fetches a random GIF from Giphy API.
 * @async
 * @return {Promise<Object | null>} A single random GIF object or null on error.
 */
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
