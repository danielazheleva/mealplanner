const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const scrapers = require('./scraper');

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/recipe', async (req, res) => {
  console.log(req.body);

  // This scrapes each recipe in the list
  for(let url of req.body.urls) {
    console.log("Scraping Recipe: " + url);
    const scrapedData = await scrapers.scrapeRecipe(url);
    console.log(scrapedData)
  };

  res.send('success');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})