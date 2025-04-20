import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { getFavoriteIds } from '../events/localStorage.js';

/**
 * Generates the detailed view for a single GIF.
 * Includes title, uploader info, upload date, and action buttons (favorite, copy, open).
 *
 * @param {Object} gif - The GIF object returned from the API.
 * @return {string} - HTML markup for the detailed GIF view.
 */
export const gifDetailsView = (gif) => {
    const date = new Date(gif.import_datetime);

    const isFav = getFavoriteIds().includes(gif.id);
    const heartSymbol = isFav ? FULL_HEART : EMPTY_HEART;

    const structure = `
      <div class="details-wrapper">
        <div class="gif-container">
          <img src="${gif.images.original.url}" alt="${gif.title}">
          <div class="copied-overlay">✔ Copied!</div>
        </div>
        <div class="gif-info">
          <h2>${gif.title}</h2>
          <p><strong>Uploaded by:</strong> ${gif.user?.display_name || gif.username || 'Anonymous'}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString('en-GB')} - ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
  
          <div class="gif-details-buttons">
            <button class="details-btn heart-btn" data-id="${gif.id}">${heartSymbol}</button>
            <button class="details-btn copy-btn" data-url="${gif.url}">Copy</button>
            <a class="details-btn" href="${gif.url}" target="_blank" rel="noopener noreferrer">Open</a>
          </div>
        </div>
      </div>
    `;

    return structure;
};
