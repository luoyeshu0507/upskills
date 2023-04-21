import sharp from 'sharp';

const img = sharp('before/partner.jpeg').resize(1000).toFile('xx2.jpeg');