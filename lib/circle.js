const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fileType = require('file-type');
const fs = require('fs');
const path = require('path');

// Pastikan direktori ./tmp/ ada
const tempDir = path.resolve('./tmp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

/**
 * Memotong gambar menjadi lingkaran atau video menjadi lingkaran (buffer input/output).
 * @param {Buffer} inputBuffer - Buffer dari file input.
 * @returns {Promise<Buffer>} - Buffer dari file output.
 */
async function cropToCircleBuffer(inputBuffer) {
    try {
        // Deteksi tipe file dari buffer
        const type = await fileType.fromBuffer(inputBuffer);
        if (!type) throw new Error('Tidak dapat mendeteksi tipe file.');

        if (type.mime.startsWith('image/')) {
            // Proses gambar
            const image = sharp(inputBuffer);
            const metadata = await image.metadata();
            const diameter = Math.min(metadata.width, metadata.height);

            const outputBuffer = await image
                .resize(diameter, diameter) // Crop menjadi persegi
                .composite([
                    {
                        input: Buffer.from(
                            `<svg>
                                <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${
                                diameter / 2
                            }" fill="white"/>
                            </svg>`
                        ),
                        blend: 'dest-in', // Buat crop lingkaran
                    },
                ])
                .png() // Format output PNG agar transparansi dipertahankan
                .toBuffer();

            console.log('Gambar berhasil dicrop menjadi lingkaran.');
            return outputBuffer;
        } else if (type.mime.startsWith('video/')) {
            // Proses video menjadi lingkaran
            return new Promise((resolve, reject) => {
                const tempInputPath = path.join(tempDir, 'input-video.mp4');
                const tempOutputPath = path.join(tempDir, 'output-video.mp4');

                // Simpan buffer input ke file sementara
                fs.writeFileSync(tempInputPath, inputBuffer);

                ffmpeg(tempInputPath)
                    .complexFilter([
                        // Crop video menjadi persegi
                        '[0:v]crop=in_h:in_h,scale=512:512[cropped]',
                        // Tambahkan lingkaran dengan alpha channel
                        `color=c=black@0.0:s=512x512[alpha];[alpha]drawbox=c=black@1.0:t=fill[mask];[mask]drawbox=x=(w-512)/2:y=(h-512)/2:w=512:h=512:c=white@1.0[cut];[cropped][cut]alphamerge`,
                    ])
                    .outputOptions('-c:v libx264') // Codec output
                    .outputOptions('-crf 23') // Kualitas video
                    .outputOptions('-pix_fmt yuva420p') // Transparansi
                    .output(tempOutputPath)
                    .on('end', () => {
                        // Baca hasil dari file sementara
                        const outputBuffer = fs.readFileSync(tempOutputPath);

                        // Hapus file sementara
                        fs.unlinkSync(tempInputPath);
                        fs.unlinkSync(tempOutputPath);

                        console.log('Video berhasil dicrop menjadi lingkaran.');
                        resolve(outputBuffer);
                    })
                    .on('error', (err) => {
                        // Hapus file sementara jika terjadi error
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

module.exports = { cropToCircleBuffer };