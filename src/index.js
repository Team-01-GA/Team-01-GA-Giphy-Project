import { DETAILS, FAVORITES, SEARCH, TRENDING, UPLOAD, UPLOADED } from './common/constants.js';
import { q } from './common/helpers.js';
import { loadTrendingView } from './events/navEvents.js';

const MAIN_CONTAINER = q('#dynamic-view');

const loadPage = async (page) => {

    switch (page) {
    case TRENDING:
        MAIN_CONTAINER.innerHTML = await loadTrendingView();
        return;

    case SEARCH:

        return;

    case DETAILS:

        return;

    case UPLOAD:

        return;

    case UPLOADED:

        return;

    case FAVORITES:

        return;
    }
};

loadPage(TRENDING);
