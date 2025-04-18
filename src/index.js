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
        MAIN_CONTAINER.style.opacity = 0;
        setTimeout(async () => MAIN_CONTAINER.innerHTML = await loadTrendingView(), 300);
        setTimeout(() => MAIN_CONTAINER.style.opacity = 1, 500);
        return;
    case SEARCH:
        MAIN_CONTAINER.style.opacity = 0;
        setTimeout(async () => MAIN_CONTAINER.innerHTML = await loadSearchView(payload), 300);
        setTimeout(() => MAIN_CONTAINER.style.opacity = 1, 1000);
        return;
    case DETAILS:
        MAIN_CONTAINER.style.opacity = 0;
        setTimeout(async () => MAIN_CONTAINER.innerHTML = await loadDetailsView(payload), 300);
        setTimeout(() => MAIN_CONTAINER.style.opacity = 1, 500);
        return;
    case UPLOAD:
        MAIN_CONTAINER.style.opacity = 0;
        await new Promise((resolve) => {
            setTimeout(async () => {
                MAIN_CONTAINER.innerHTML = await loadUploadView();
                resolve();
            }, 300);
        });
        // MAIN_CONTAINER.innerHTML = await loadUploadView();
        setTimeout(() => MAIN_CONTAINER.style.opacity = 1, 500);
        return;
    case FAVORITES:
        MAIN_CONTAINER.style.opacity = 0;
        setTimeout(async () => MAIN_CONTAINER.innerHTML = await loadFavoritesView(), 300);
        setTimeout(() => MAIN_CONTAINER.style.opacity = 1, 500);
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

    const listHeartButton = event.target.classList.contains('single-view-btn') &&
                            event.target.classList.contains('heart-btn');

    if (listHeartButton) {
        const gifID = event.target.dataset.id;

        if (toggleFavorite(gifID)) {
            event.target.innerHTML = FULL_HEART;
        } else {
            event.target.innerHTML = EMPTY_HEART;
        }
    }


    if (event.target.id === 'upload-gif-btn') {
        event.target.textContent = 'Uploading...';
        const uploader = qs('#uploader');
        const file = uploader[0].files[0];

        if (!file) {
            alert('Please provide a GIF file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

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

upload.addEventListener('click', async () => {
    await loadPage(UPLOAD);

    const fileInput = q('#uploader');
    const fileLabel = q('.upload-field span');
    const uploadBtn = q('#upload-gif-btn');

    fileLabel.textContent = 'Choose file...';

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileLabel.textContent = fileInput.files[0].name;
            fileLabel.style.fontSize = 'initial';
            uploadBtn.classList.add('active');
        } else {
            fileLabel.textContent = 'Choose file...';
            uploadBtn.classList.remove('active');
        }
    });
});

favoritesBtn.addEventListener('click', () => {
    loadPage(FAVORITES);
});

loadPage(TRENDING);
