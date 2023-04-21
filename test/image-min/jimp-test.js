import Jimp from 'jimp';

const image = await Jimp.read('./before/背景图5-#F6F8FA@2x.jpg');

console.log(image.bitmap)