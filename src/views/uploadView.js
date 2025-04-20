/**
 * Generates the HTML markup for the upload GIF view.
 * Includes a file input form and an upload button.
 *
 * @return {string} - HTML string for rendering the upload UI.
 */
export const uploadView = () => `
    <div id="upload-gif">
        <div id="upload-form">
            <form>
                <input type="file" id="uploader" class="upload-field" accept="image/gif" />
                <label for="uploader" class="upload-field"><span>Choose File...</span></label>
            </form>
        </div>
        <div id="upload-btn-container">
            <button id="upload-gif-btn">Upload!</button>
        </div>
    </div>
`;
