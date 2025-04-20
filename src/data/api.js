// API keys

/** @type {string} Primary Giphy API key */
export const KEY_1 = 'KHzdj1OxPJRiUyRNnS0YUGxGIkLQb8AL';

/** @type {string} Backup Giphy API key */
export const KEY_2 = '5l5FeU1u8XiTD86mLuATtsXevbARXXKc';


// API endpoints

/**
 * Returns the trending endpoint URL using the given API key.
 * @param {string} key - Giphy API key.
 * @return {string} The full trending endpoint URL.
 */
export const trendingEndpoint = (key) => `https://api.giphy.com/v1/gifs/trending?api_key=${key}`;

/**
 * Returns the search endpoint URL using the given API key.
 * @param {string} key - Giphy API key.
 * @return {string} The full search endpoint URL.
 */
export const searchEndpoint = (key) => `https://api.giphy.com/v1/gifs/search?api_key=${key}`;

/**
 * Returns the details endpoint for a specific GIF.
 * @param {string} key - Giphy API key.
 * @param {string} id - ID of the GIF.
 * @return {string} URL for fetching a single GIF.
 */
export const singleGifEndpoint = (key, id) => `https://api.giphy.com/v1/gifs/${id}?api_key=${key}`;


/**
 * Returns the endpoint for multiple GIFs based on their IDs.
 * @param {string} key - Giphy API key.
 * @param {string[]} ids - Array of GIF IDs.
 * @return {string} URL for fetching multiple GIFs.
 */
export const multipleGifsEndpoint = (key, ids) => `https://api.giphy.com/v1/gifs?ids=${ids.join(',')}&api_key=${key}`;

/**
 * Static upload endpoint URL (does not require API key in string)
 * @type {string}
 */
export const uploadEndpoint = 'https://upload.giphy.com/v1/gifs';

/**
 * Returns the random GIF endpoint URL using the given API key.
 * @param {string} key - Giphy API key.
 * @return {string} The full random GIF endpoint URL.
 */
export const randomEndpoint = (key) => `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
