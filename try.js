import axios from 'axios'
import { parse } from 'node-html-parser'

const getData = async () => {
  try {
    const response = await axios.get("https://www.google.com")
    const parsedHtml = parse(response.data);
    const allImages = parsedHtml.querySelectorAll('img')
    allImages.forEach((image) => {
      console.log(image.getAttribute('src'))
      return
    })
  } catch (err) {
    console.error(err);
  }
}

getData();
