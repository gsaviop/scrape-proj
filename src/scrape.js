const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

async function scrapePage() {
    //abrindo a página no browser headless
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops");

    //pegando os dados relevantes da página
    await page.waitForSelector('.thumbnail');

    //criando uma lista com os laptops
    const allLaptops = await page.evaluate(() => {
        const laptopArr = [];

        const laptopElements = document.querySelectorAll('.thumbnail');

        for (const laptop of laptopElements) {
            const title = laptop.querySelector('h4 > a.title').getAttribute('title');
            const price = Number(laptop.querySelector('.price').innerText.slice(1));
            const description = laptop.querySelector('.description').innerText;
            
            laptopArr.push({title, price, description});
        }
        return laptopArr;
    });

    //fazendo a filtragem dos laptops
    let lenovoLaptops = allLaptops.filter(laptop => laptop.title.includes('Lenovo'));

    lenovoLaptops.sort((item1, item2) => item1 - item2);

    console.log(lenovoLaptops);

    //fechando a página
    await browser.close();

    return lenovoLaptops;

}

module.exports = { scrapePage };
