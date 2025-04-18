import { getGifById, getTrendingGifs, getGifsByQuery, getMultipleGifsByIds, getRandomGif } from '../requests/requestService.js';
import { gifDetailsView } from '../views/detailsView.js';
import { gifListView } from '../views/listView.js';
import { uploadView } from '../views/uploadView.js';
import { getFavoriteIds, getUploadedGifs } from './localStorage.js';


export const loadTrendingView = async () => {
    const dataTrending = await getTrendingGifs();

    return gifListView(dataTrending);
};

export const loadDetailsView = async (gifID) => {
    const dataDetails = await getGifById(gifID);

    return gifDetailsView(dataDetails);
};


export const loadSearchView = async (query) => {
    const searchData = await getGifsByQuery(query);

    return gifListView(searchData);
};

export const loadUploadView = async () => {
    const uploadedGIFs = await getUploadedGifs();

    if (!uploadedGIFs) {
        return `${uploadView()}
            <div id="uploads-fallback">
                <p>You haven't uploaded anything yet - consider contributing!</p>
            </div>
        `;
    }

    return `${uploadView()}
        <div id="uploads">
            ${gifListView(uploadedGIFs)}
        </div>
    `;
};

export const loadFavoritesView = async () => {
    const favoritesArray = getFavoriteIds();

    if (favoritesArray.length === 0) {
        const randomGif = await getRandomGif();

        if (randomGif) {
            return `
            <div class="random-fallback">
                <p>You haven't favorited anything yet - here's a random GIF for you</p>
                ${gifDetailsView(randomGif)}
            </div>
            `;
        }
        return `<p>Couldn't load anything right now.</p>`;
    }

    const favoritesData = await getMultipleGifsByIds(favoritesArray);
    return gifListView(favoritesData);
};
