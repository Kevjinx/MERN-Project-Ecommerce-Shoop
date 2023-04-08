import bikes from '../data/bikes.js';
import fs from 'fs';

// const getRandomInt = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const bikesWithStock = bikes.map((bike) => {
//   return {
//     ...bike,
//     countInStock: getRandomInt(0, 10),
//   };
// });

// const bikesWithStockScript = `
// const bikes = ${JSON.stringify(bikesWithStock, null, 2)};
// export default bikes;
// `;

// fs.writeFile('bikes.js', bikesWithStockScript, (err) => {
//   if (err) {
//     console.error('Error writing file:', err);
//   } else {
//     console.log('File written successfully');
//   }
// });

const updatedBikes = bikes.map((bike) => {
  const price = Number(bike.price.replace(/[^0-9.-]+/g, ''));
  return { ...bike, price };
});

const newFileName = 'updatedBikes.js';

fs.writeFile(
  newFileName,
  `const updatedBikes = ${JSON.stringify(
    updatedBikes,
    null,
    2
  )};\n\nexport default updatedBikes;\n`,
  (err) => {
    if (err) throw err;
    console.log(
      `New file "${newFileName}" has been created with updated bikes.`
    );
  }
);
