const puppeteer = require('puppeteer');

async function scrapeRecipe(url) {
    console.log("in scraper");
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

    const [el1] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/h1');
    const recipeName = await (await el1.getProperty('textContent')).jsonValue();

    const [el2] = await page.$x('//*[@id="__next"]/div[4]/main/div/section/div/div[3]/ul[2]/li[3]/div/div[2]');
    const servingsText = await (await el2.getProperty('textContent')).jsonValue();
    let servings = parseFloat(servingsText.match(/[\d\.]+/)) 

    const ingredients = await page.$$eval('.recipe__ingredients section ul li', lis => lis.map((li) => {
        return(li.innerText);
    }))
    
    const macros = await page.$$eval('.key-value-blocks tbody tr td', tds => tds.map((td) => {
        return(td.innerText)
    } ));  

    const wantedMacros = ['kcal', 'carbs', 'fat', 'protein'];
    const formattedMacros = [];

    for(let i=0; i<macros.length; i++){
        if(wantedMacros.includes(macros[i])){
            const map = {
                key: macros[i].trim(),
                value: parseFloat(macros[i+1])
            };
            formattedMacros.push(map);
        }
    }

    await browser.close();
    console.log(recipeName, servings, ingredients, formattedMacros);
    return {recipeName, servings, ingredients, formattedMacros};

}


module.exports = {
    scrapeRecipe
}