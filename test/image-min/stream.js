import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import fs from 'fs';

const mockStream = fs.createReadStream('before/partner.jpeg');
console.error(111, mockStream);
let bufs = [];
mockStream.on('data', function(d){ bufs.push(d); });
mockStream.on('end', async function(){
  const buf = Buffer.concat(bufs);

  const files2 = await imagemin.buffer(buf, {
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

  fs.writeFile('./xx.jpeg', files2, function(e) {
    console.error(e);
  });

});


