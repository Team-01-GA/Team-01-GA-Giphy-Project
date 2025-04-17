import { DETAILS, FAVORITES, SEARCH, TRENDING, UPLOAD, UPLOADED } from './common/constants.js';
import { q } from './common/helpers.js';
import { loadDetailsView, loadTrendingView } from './events/navEvents.js';

const MAIN_CONTAINER = q('#dynamic-view');

const loadPage = async (page, id) => {

    switch (page) {
    case TRENDING:
        MAIN_CONTAINER.innerHTML = await loadTrendingView();
        return;

    case SEARCH:

        return;

    case DETAILS:
        MAIN_CONTAINER.innerHTML = await loadDetailsView(id);
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

loadPage(TRENDING);
