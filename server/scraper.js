const puppeteer = require('puppeteer');

async function scrapeRecipe(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el1] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/h1');
    const recipeTxt = await el1.getProperty('textContent');
    const recipe = await recipeTxt.jsonValue();
    
    const [el2] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/ul[2]/li[3]/div/div[2]');
    const amountTxt = await el2.getProperty('textContent');
    const amount = await amountTxt.jsonValue();

    // const el3 = await page.$x('//*[@id="__next"]/div[4]/main/div/div/div/div[1]/div[1]/div[3]/section[1]/section/ul', 
    //     ingredients => ingredients.map(ingredient => ingredient.textContent));
    // el3.map(el => el.jsonValue());

    await browser.close();

    console.log({recipe, amount});

}


scrapeRecipe('https://www.bbcgoodfood.com/recipes/chocolate-chip-muffins');