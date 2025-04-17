// API keys

export const KEY_1 = 'KHzdj1OxPJRiUyRNnS0YUGxGIkLQb8AL';

export const KEY_2 = '5l5FeU1u8XiTD86mLuATtsXevbARXXKc';


// API endpoints

export const trendingEndpoint = (key) => `https://api.giphy.com/v1/gifs/trending?api_key=${key}`;

export const searchEndpoint = (key) => `https://api.giphy.com/v1/gifs/search?api_key=${key}`;

export const singleGifEndpoint = (key, id) => `https://api.giphy.com/v1/gifs/${id}?api_key=${key}`;

export const multipleGifsEndpoint = (key, ids) => `https://api.giphy.com/v1/gifs?ids=${ids.join(',')}&api_key=${key}`;

export const uploadEndpoint = 'https://upload.giphy.com/v1/gifs';

export const randomEndpoint = (key) => `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
