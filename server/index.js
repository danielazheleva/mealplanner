const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const scrapers = require('./scraper');

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/recipe', async (req, res) => {
    console.log("Scraping Recipe: " + req.body.urlValue);
    const scrapedData = await scrapers.scrapeRecipe(req.body.urlValue);
    console.log(scrapedData)
    
    // TODO - add to database

    res.send('success');
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})