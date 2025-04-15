export function API_KEY(number) {
    switch (number) {
        case 1:
            return 'KHzdj1OxPJRiUyRNnS0YUGxGIkLQb8AL';

        case 2: 
            return '5l5FeU1u8XiTD86mLuATtsXevbARXXKc';
    }
}

const TRENDING_ENDPOINT = 'https://api.giphy.com/v1/gifs/trending';
const SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const DETAILS_ENDPOINT = (id) => `https://api.giphy.com/v1/gifs/${id}`;
const UPLOAD_ENDPOINT = 'https://upload.giphy.com/v1/gifs';