import { FAVORITES_TITLE, SEARCH_TITLE, TRENDING_TITLE, UPLOADED_TITLE } from '../common/constants.js';
import { getGifById, getTrendingGifs, getGifsByQuery, getMultipleGifsByIds, getRandomGif } from '../requests/requestService.js';
import { gifDetailsView } from '../views/detailsView.js';
import { gifListView } from '../views/listView.js';
import { uploadView } from '../views/uploadView.js';
import { getFavoriteIds, getUploadedGifs } from './localStorage.js';

/**
 * Loads and renders the trending GIFs view.
 * @async
 * @return {Promise<string>} - HTML markup for the trending GIF list.
 */
export const loadTrendingView = async () => {
    const dataTrending = await getTrendingGifs();

    return gifListView(dataTrending, TRENDING_TITLE);
};

/**
 * Loads and renders the detailed view for a specific GIF by ID.
 * @async
 * @param {string} gifID - The ID of the GIF to display.
 * @return {Promise<string>} - HTML markup for the detailed GIF view.
 */
export const loadDetailsView = async (gifID) => {
    const dataDetails = await getGifById(gifID);

    return gifDetailsView(dataDetails);
};

/**
 * Loads and renders search results based on user query.
 * @async
 * @param {string} query - The search string input by the user.
 * @return {Promise<string>} - HTML markup for the search result GIF list.
 */
export const loadSearchView = async (query) => {
    const searchData = await getGifsByQuery(query);

    return gifListView(searchData, `${SEARCH_TITLE}"${query}"`);
};

/**
 * Loads and renders the upload view and previously uploaded GIFs (if any).
 * Falls back to a friendly message if no uploads are stored.
 * @async
 * @return {Promise<string>} - HTML markup for the upload page and uploaded GIFs.
 */
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
            ${gifListView(uploadedGIFs, UPLOADED_TITLE)}
        </div>
    `;
};

/**
 * Loads and renders the favorites view from localStorage.
 * If no favorites exist, shows a random GIF instead.
 * @async
 * @return {Promise<string>} - HTML markup for the favorites list or fallback GIF.
 */
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
    return gifListView(favoritesData, FAVORITES_TITLE);
};
