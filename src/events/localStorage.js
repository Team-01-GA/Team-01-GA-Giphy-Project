import { FAVORITES_KEY } from '../common/constants.js';


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
