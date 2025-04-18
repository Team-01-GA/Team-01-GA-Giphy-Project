import {
    DETAILS,
    FAVORITES,
    SEARCH,
    TRENDING,
    UPLOAD,
    FULL_HEART,
    EMPTY_HEART,
} from './common/constants.js';

import { q, qs } from './common/helpers.js';

import {
    loadDetailsView,
    loadSearchView,
    loadTrendingView,
    loadUploadView,
    loadFavoritesView,
} from './events/navEvents.js';

import { uploadGifToServer } from './requests/requestService.js';

import { getFavoriteIds, storeUploadedGifId, toggleFavorite } from './events/localStorage.js';

const MAIN_CONTAINER = q('#dynamic-view');
const searchInput = q('#search-input');
const trending = q('#trending-btn');
const upload = q('#upload-btn');
const favoritesBtn = q('#favorites-btn');

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
        MAIN_CONTAINER.innerHTML = await loadUploadView();
        return;
    case FAVORITES:
        MAIN_CONTAINER.innerHTML = await loadFavoritesView();
        return;
    }
};

MAIN_CONTAINER.addEventListener('click', async (event) => {

    if (event.target.classList.contains('gif-list-card')) {
        const gifID = event.target.id;

        await loadPage(DETAILS, gifID);

        const heartBtn = q('.heart-btn');
        if (heartBtn) {
            const isFav = getFavoriteIds().includes(gifID);
            heartBtn.textContent = isFav ? FULL_HEART : EMPTY_HEART;

            heartBtn.addEventListener('click', () => {
                const wasAdded = toggleFavorite(gifID);
                heartBtn.textContent = wasAdded ? FULL_HEART : EMPTY_HEART;
            });
        }

        const copyBtn = q('.copy-btn');
        const overlay = q('.copied-overlay');
        const url = q('a.details-btn')?.href;

        if (copyBtn && overlay && url) {
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(url);
                    overlay.style.opacity = '1';
                    setTimeout(() => (overlay.style.opacity = '0'), 1500);
                } catch (error) {
                    console.error('Failed to copy GIF URL', error);
                }
            });
        }
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

        const uploadedId = await uploadGifToServer(formData);
        storeUploadedGifId(uploadedId);

        loadPage(UPLOAD);
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

favoritesBtn.addEventListener('click', () => {
    loadPage(FAVORITES);
});

loadPage(TRENDING);
