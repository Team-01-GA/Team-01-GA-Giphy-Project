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

import { storeUploadedGifId, toggleFavorite } from './events/localStorage.js';

const MAIN_CONTAINER = q('#dynamic-view');
const searchInput = q('#search-input');
const trending = q('#trending-btn');
const upload = q('#upload-btn');
const favoritesBtn = q('#favorites-btn');

/**
 * Dynamically loads a view based on the page type.
 * Handles smooth transition animations and data payloads (like a search query or GIF ID).
 * @param {string} page - The page constant to load (e.g., TRENDING, DETAILS).
 * @param {any} [payload=null] - Optional data passed to the view loader (e.g., gif ID or search query).
 */
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

// Delegated click event listener for all buttons inside MAIN_CONTAINER
MAIN_CONTAINER.addEventListener('click', async (event) => {

    // Opens details view when GIF card is clicked
    if (event.target.classList.contains('gif-list-card')) {
        const gifID = event.target.id;

        await loadPage(DETAILS, gifID);
    }

    // Toggles heart button (inside details view)
    if (event.target.classList.contains('heart-btn')) {
        const gifID = event.target.dataset.id;

        if (toggleFavorite(gifID)) {
            event.target.innerHTML = FULL_HEART;
        } else {
            event.target.innerHTML = EMPTY_HEART;
        }
    }

    // Copies GIF URL to clipboard
    if (event.target.classList.contains('copy-btn')) {
        const overlay = q('.copied-overlay');
        const gifURL = event.target.dataset.url;

        try {
            await navigator.clipboard.writeText(gifURL);
            overlay.style.opacity = '1';
            setTimeout(() => (overlay.style.opacity = '0'), 1500);
        } catch (error) {
            console.error('Failed to copy GIF URL', error);
        }
    }

    // Toggles heart in list view
    if (event.target.classList.contains('single-view-btn')) {
        const gifID = event.target.dataset.id;

        if (toggleFavorite(gifID)) {
            event.target.innerHTML = FULL_HEART;
        } else {
            event.target.innerHTML = EMPTY_HEART;
        }
    }

    // Handles upload button click
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

/**
 * Triggers search when Enter is pressed in search input.
 */
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            loadPage(SEARCH, query);
        }
    }
});

/**
 * Loads trending view when trending button is clicked.
 */
trending.addEventListener('click', () => {
    loadPage(TRENDING);
});

/**
 * Loads upload view and sets up file input interaction.
 */
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

/**
 * Loads favorites view when favorites button is clicked.
 */
favoritesBtn.addEventListener('click', () => {
    loadPage(FAVORITES);
});

// Loads trending view on initial page load
loadPage(TRENDING);
