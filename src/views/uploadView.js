export const uploadView = () => `
    <div id="upload-gif">
        <div id="upload-form">
            <form>
                <input type="text" class="upload-field" placeholder="GIF name" />
                <input type="text" class="upload-field" placeholder="Author" />
                <input type="file" id="uploader" class="upload-field" accept="image/gif" />
                <label for="uploader" class="upload-field"><span>Choose File...</span></label>
            </form>
        </div>
        <div id="upload-btn-container">
            <button id="upload-gif-btn">Upload!</button>
        </div>
    </div>
`;
