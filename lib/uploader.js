const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to qu.ax
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * @param {Buffer} buffer Image Buffer
 */

module.exports = async (buffer) => {
    const { ext, mime } = await fromBuffer(buffer);
    const form = new FormData();
    form.append('files[]', buffer, {
        filename: 'tmp.' + ext,
        contentType: mime,
    });

    const { data } = await axios.post(
        "https://qu.ax/upload.php",
        form,
        {
            headers: {
                ...form.getHeaders(),
            }
        }
    );

    return data.files[0].url;
};