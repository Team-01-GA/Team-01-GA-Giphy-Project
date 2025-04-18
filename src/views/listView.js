import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { getFavoriteIds } from '../events/localStorage.js';

export const gifListView = (gifList, title) => `
    <div id="gif-list">
        <h1 id="title">${title}</h1>
        <div class="content">
            ${gifList.map(gifObject => gifSingleView(gifObject)).join(`\n`)}
        </div>
    </div>
`;

export const gifSingleView = (gifObject) => {
    const isFav = getFavoriteIds().includes(gifObject.id);
    const heartSymbol = isFav ? FULL_HEART : EMPTY_HEART;

    return `
    <div id="${gifObject.id}" class="gif-list-card" style="background-image: url('${gifObject.images.downsized_medium.url}')">
        <div class="gif-buttons">
            <button class="single-view-btn heart-btn" data-id="${gifObject.id}">${heartSymbol}</button>
        </div>
        ${gifObject.title ? `
            <div class="gif-details-small">
                <p class="gif-name">${gifObject.title}</p>
            </div>
            ` : ''}
    </div>
`;
};
