import { FAVORITES_KEY, UPLOADS_KEY } from '../common/constants.js';
import { getMultipleGifsByIds } from '../requests/requestService.js';


export const getFavoriteIds = () => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
};


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

export const getUploadedGifs = async () => {
    const storage = localStorage.getItem(UPLOADS_KEY);
    const idsArray = storage ? JSON.parse(storage) : [];

    if (idsArray.length) {
        const gifs = await getMultipleGifsByIds(idsArray);
        return gifs;
    }

    return null;
};

export const storeUploadedGifId = (id) => {
    const storage = localStorage.getItem(UPLOADS_KEY);
    const idsArray = storage ? JSON.parse(storage) : [];

    idsArray.push(id);

    localStorage.setItem(UPLOADS_KEY, JSON.stringify(idsArray));
};
