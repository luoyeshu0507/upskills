import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import fs from 'fs';

const files = await imagemin(['./before/*'], {
  destination: './after',
  plugins: [
    imageminMozjpeg(),
    imageminPngquant({
      quality: [0.9, 1]
    }),
    imageminSvgo(),
    imageminGifsicle(),
  ]
});

console.log(files);

const mockStream = fs.readFileSync('before/partner.jpeg');
console.error(111, mockStream);

const files2 = await imagemin.buffer(mockStream, {
  plugins: [
    imageminMozjpeg(),
    imageminPngquant({
      quality: [0.9, 1]
    }),
    imageminSvgo(),
    imageminGifsicle(),
  ]
});

console.log(files2);