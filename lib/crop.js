const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PassThrough } = require('stream');
const fileType = require('file-type');
const fs = require('fs');
const path = require('path');

const tempDir = path.resolve('./tmp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
} 

/**
 * Crop Gambar/Video menjadi 512x512 (buffer input/output).
 * @param {Buffer} inputBuffer - Buffer dari file input.
 * @returns {Promise<Buffer>} - Buffer dari file output.
 */
async function crop(inputBuffer) {
    try {
        const type = await fileType.fromBuffer(inputBuffer);
        if (!type) throw new Error('Tidak dapat mendeteksi tipe file.');

        if (type.mime.startsWith('image/')) {
            const outputBuffer = await sharp(inputBuffer)
                .resize({
                    width: 512,
                    height: 512,
                    fit: sharp.fit.cover,
                })
                .toBuffer();
            console.log('Gambar berhasil dicrop menjadi kotak.');
            return outputBuffer;
        } else if (type.mime.startsWith('video/')) {
            function generateRandomLetters(length = 5) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomLetters += alphabet[randomIndex];
    }
    return randomLetters + ".mp4";
}
            return new Promise((resolve, reject) => {
                const tempInputPath = path.join(tempDir, generateRandomLetters());
                const tempOutputPath = path.join(tempDir, generateRandomLetters());
                fs.writeFileSync(tempInputPath, inputBuffer);
                ffmpeg(tempInputPath)
                    .videoFilters('crop=in_h:in_h')
                    .size('512x512')
                    .output(tempOutputPath)
                    .on('end', () => {
                        const outputBuffer = fs.readFileSync(tempOutputPath);
                        fs.unlinkSync(tempInputPath);
                        fs.unlinkSync(tempOutputPath);
                        console.log('Video berhasil dicrop menjadi kotak.');
                        resolve(outputBuffer);
                    })
                    .on('error', (err) => {
                        fs.unlinkSync(tempInputPath);
                        if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
                        console.error('Gagal memproses video:', err);
                        reject(err);
                    })
                    .run();
            });
        } else {
            throw new Error('Tipe file tidak didukung. Hanya mendukung gambar atau video.');
        }
    } catch (error) {
        console.error('Gagal memproses file:', error);
        throw error;
    }
}

module.exports = { crop };