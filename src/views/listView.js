export const gifListView = (gifList) => `
    <div id="gif-list">
        <h1 id="title">Trending GIFs Right Now</h1>
        <div class="content">
            ${gifList.map(gifObject => gifSingleView(gifObject)).join(`\n`)}
        </div>
    </div>
`;

export const gifSingleView = (gifObject) => `
    <div id="${gifObject.id}" class="gif-list-card" style="background-image: url('${gifObject.images.downsized_medium.url}')">
        ${gifObject.title ? `<p class="gif-name">${gifObject.title}</p>` : ''}
    </div>
`;
