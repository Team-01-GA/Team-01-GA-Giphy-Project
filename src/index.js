import { DETAILS, FAVORITES, SEARCH, TRENDING, UPLOAD, UPLOADED } from './common/constants.js';
import { q } from './common/helpers.js';
import { loadDetailsView, loadSearchView, loadTrendingView } from './events/navEvents.js';

const MAIN_CONTAINER = q('#dynamic-view');
const input = q('#search-input');
const trending = q('#trending-btn');


const loadPage = async (page, payload = null) => {

    switch (page) {
    case TRENDING:
        MAIN_CONTAINER.innerHTML = await loadTrendingView();
        return;

    case SEARCH:
        MAIN_CONTAINER.innerHTML = await loadSearchView(payload);
        return;

    case DETAILS:
        MAIN_CONTAINER.innerHTML = await loadDetailsView(payload);
        return;

    case UPLOAD:

        return;

    case UPLOADED:

        return;

    case FAVORITES:

        return;
    }
};

MAIN_CONTAINER.addEventListener('click', async () => {

    if (event.target.classList.contains('gif-list-card')) {
        const gifID = event.target.id;

        await loadPage(DETAILS, gifID);

        const copyBtn = q('.copy-btn');
        const overlay = q('.copied-overlay');
        const url = q('a.details-btn').href;
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(url);
                overlay.style.opacity = '1';

                setTimeout(() => {
                    overlay.style.opacity = '0';
                }, 1500);
            } catch (error) {
                console.error('Failed to copy GIF URL', error);
            }
        });
    }

});


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
            loadPage(SEARCH, query);
        }
    }
});

trending.addEventListener('click', () => {
    loadPage(TRENDING);
});


loadPage(TRENDING);
