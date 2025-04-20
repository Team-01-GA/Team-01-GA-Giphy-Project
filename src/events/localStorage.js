import { FAVORITES_KEY, UPLOADS_KEY } from '../common/constants.js';
import { getMultipleGifsByIds } from '../requests/requestService.js';

/**
 * Retrieves the list of favorited GIF IDs from localStorage.
 * @return {string[]} An array of favorite GIF IDs.
 */
export const getFavoriteIds = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
};

/**
 * Toggles a GIF ID in the favorites list.
 * Adds it if not present, removes it if already stored.
 * @param {string} id - The ID of the GIF to toggle.
 * @return {boolean} True if added, false if removed.
 */
export const toggleFavorite = (id) => {
    const idsArray = getFavoriteIds();

    if (!(idsArray.includes(id))) {
        idsArray.push(id);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(idsArray));
        return true;
    } else {
        const index = idsArray.indexOf(id);
        idsArray.splice(index, 1);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(idsArray));
        return false;
    }
};

/**
 * Retrieves all uploaded GIFs from localStorage using their IDs.
 * Uses getMultipleGifsByIds to fetch full GIF data from the API.
 * @async
 * @return {Promise<Object[] | null>} Array of GIF objects or null if none found.
 */
export const getUploadedGifs = async () => {
    const storage = localStorage.getItem(UPLOADS_KEY);
    const idsArray = storage ? JSON.parse(storage) : [];

    if (idsArray.length) {
        const gifs = await getMultipleGifsByIds(idsArray);
        return gifs;
    }

    return null;
};

/**
 * Stores a new uploaded GIF ID in localStorage.
 * Adds it to the existing uploads list or creates one.
 * @param {string} id - The uploaded GIF's ID.
 */
export const storeUploadedGifId = (id) => {
    const storage = localStorage.getItem(UPLOADS_KEY);
    const idsArray = storage ? JSON.parse(storage) : [];

    idsArray.push(id);

    localStorage.setItem(UPLOADS_KEY, JSON.stringify(idsArray));
};
