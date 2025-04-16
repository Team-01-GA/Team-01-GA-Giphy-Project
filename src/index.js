import { DETAILS, FAVORITES, SEARCH, TRENDING, UPLOAD, UPLOADED } from './common/constants.js';
import { q } from './common/helpers.js';

const MAIN_CONTAINER = q('#dynamic-view');

const loadPage = (page) => {

    switch (page) {
    case TRENDING:

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
