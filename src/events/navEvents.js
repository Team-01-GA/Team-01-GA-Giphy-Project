import { getTrendingGifs } from '../requests/requestService.js';
import { gifListView } from '../views/listView.js';


export const loadTrendingView = async () => {
    const dataTrending = await getTrendingGifs();

    return gifListView(dataTrending.data);
};
