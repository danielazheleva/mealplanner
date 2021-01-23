const puppeteer = require('puppeteer');

async function scrapeRecipe(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el1] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/h1');
    const recipeName = await (await el1.getProperty('textContent')).jsonValue();

    const [el2] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/ul[2]/li[3]/div/div[2]');
    const servings = await (await el2.getProperty('textContent')).jsonValue();

    const ingredients = await page.$$eval('.recipe__ingredients section ul li', lis => lis.map((li) => {
        return(li.innerText);
    }))
    
    const macros = await page.$$eval('.key-value-blocks tbody tr td', tds => tds.map((td) => {
        return(td.innerText)
    } ));  


    await browser.close();

    console.log({ recipeName, servings, ingredients, macros});

}


scrapeRecipe('https://www.bbcgoodfood.com/recipes/chocolate-chip-muffins');