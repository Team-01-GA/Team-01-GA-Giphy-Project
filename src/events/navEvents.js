import { getGifById, getTrendingGifs, getGifsByQuery } from '../requests/requestService.js';
import { gifDetailsView } from '../views/detailsView.js';
import { gifListView } from '../views/listView.js';


export const loadTrendingView = async () => {
    const dataTrending = await getTrendingGifs();

    return gifListView(dataTrending.data);
};

export const loadDetailsView = async (gifID) => {
    const dataDetails = await getGifById(gifID);

    return gifDetailsView(dataDetails);
};


export const loadSearchView = async (query) => {
    const searchData = await getGifsByQuery(query);

    return gifListView(searchData);
};

