import axios, { all } from 'axios'
import { parse } from 'node-html-parser'
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const saveImageFromUrl = async (url, name) => {
  try {
    const response = await axios({
      url,
      responseType: 'stream',
    });
    const finalPath = path.join(__dirname + '/downloads/' + name + '.jpg');
    console.log(finalPath);
    const writer = fs.createWriteStream(finalPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject);
    });
  } catch (err) {
    console.error("Error Downloading: ", "The site didn't allow scraping");
  }
};

const getData = async (site) => {
  try {
    const response = await axios.get(site)
    const parsedHtml = parse(response.data);
    const allImages = parsedHtml.querySelectorAll('img')
    allImages.forEach((image, index) => {
      const img = image.getAttribute('src')
      if (img) {
        console.log("Image found: ", img)
        const fileName = `image_${index}`
        console.log(`Link: ${site}${img}`)
        const imgSrc = `${img}`
        saveImageFromUrl(imgSrc, fileName);
      }
    })
  } catch (err) {
    console.error(err);
  }
}

console.log(process.argv[2])
getData(process.argv[2])
