## API 

`prefix = /api/v1`

### Recipes `/recipes`

`GET /{url}`
Triggers scraping of a URL.
Returns a `ScrapedRecipe` object if successful, `404` if no recipe found, `500` if scraping unsuccessful. 