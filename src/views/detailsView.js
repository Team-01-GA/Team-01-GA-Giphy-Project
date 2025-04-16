export const gifDetailsView = (container, gif) => {
    const date = new Date(gif.import_datetime);

    container.innerHTML = `
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
            <button class="details-btn heart">♡</button>
            <button class="details-btn copy-btn">Copy</button>
            <a class="details-btn" href="${gif.url}" target="_blank" rel="noopener noreferrer">Open</a>
          </div>
        </div>
      </div>
    `;

    const copyBtn = container.querySelector('.copy-btn');
    const overlay = container.querySelector('.copied-overlay');
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(gif.url);
            overlay.style.opacity = '1';

            setTimeout(() => {
                overlay.style.opacity = '0';
            }, 1500);
        } catch (error) {
            console.error('Failed to copy GIF URL', error);
        }
    });
};
