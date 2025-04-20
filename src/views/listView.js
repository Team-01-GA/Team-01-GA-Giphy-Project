import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { getFavoriteIds } from '../events/localStorage.js';

/**
 * Generates the entire GIF list view section.
 * Includes title and mapped single GIF cards.
 *
 * @param {Object[]} gifList - Array of GIF objects from the API.
 * @param {string} title - Title to display above the list.
 * @return {string} - HTML markup for the list view.
 */
export const gifListView = (gifList, title) => `
    <div id="gif-list">
        <h1 id="title">${title}</h1>
        <div class="content">
            ${gifList.map(gifObject => gifSingleView(gifObject)).join(`\n`)}
        </div>
    </div>
`;

/**
 * Generates a single GIF card used in the list view.
 * Includes a background image, favorite heart button, and title (if available).
 *
 * @param {Object} gifObject - The GIF data object.
 * @return {string} - HTML markup for one GIF card.
 */
export const gifSingleView = (gifObject) => {
    const isFav = getFavoriteIds().includes(gifObject.id);
    const heartSymbol = isFav ? FULL_HEART : EMPTY_HEART;

    return `
    <div id="${gifObject.id}" class="gif-list-card" style="background-image: url('${gifObject.images.downsized_medium.url}')">
        <div class="gif-buttons">
            <button class="single-view-btn" data-id="${gifObject.id}">${heartSymbol}</button>
        </div>
        ${gifObject.title ? `
            <div class="gif-details-small">
                <p class="gif-name">${gifObject.title}</p>
            </div>
            ` : ''}
    </div>
`;
};
