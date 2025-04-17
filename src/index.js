import { DETAILS, FAVORITES, SEARCH, TRENDING, UPLOAD, UPLOADED } from './common/constants.js';
import { q, qs } from './common/helpers.js';
import { loadDetailsView, loadSearchView, loadTrendingView, loadUploadView } from './events/navEvents.js';
import { uploadGifToServer } from './requests/requestService.js';

const MAIN_CONTAINER = q('#dynamic-view');
const searchInput = q('#search-input');
const trending = q('#trending-btn');
const upload = q('#upload-btn');


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
        MAIN_CONTAINER.innerHTML = loadUploadView();
        return;

    case UPLOADED:

        return;

    case FAVORITES:

        return;
    }
};

MAIN_CONTAINER.addEventListener('click', async (event) => {

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

    if (event.target.id === 'upload-gif-btn') {
        const uploadFields = qs('#upload-form input');
        const gifName = `${uploadFields[0]} by ${uploadFields[1]}`;
        const file = uploadFields[2].files[0];

        if (!file) {
            alert('Please provide a GIF file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', gifName);

        uploadGifToServer(formData);
    }

});


searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            loadPage(SEARCH, query);
        }
    }
});

trending.addEventListener('click', () => {
    loadPage(TRENDING);
});

upload.addEventListener('click', () => {
    loadPage(UPLOAD);
});


loadPage(UPLOAD);
