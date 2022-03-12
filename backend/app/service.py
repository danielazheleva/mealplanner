import uuid
import re

from recipe_scrapers import scrape_me

from app.models import ScrapedRecipe


def scrape_recipe(url: str) -> ScrapedRecipe:
    print(f"About to scrape {url}")
    scraper = scrape_me(url)

    needle = '\d+'
    recipe = ScrapedRecipe(
        id=uuid.uuid4().hex,
        url=url,
        recipeYield=int(re.match(needle, scraper.yields()).group(0)),
        name=scraper.title(),
        nutrition=scraper.nutrients(),
        ingredients=scraper.ingredients()
    )

    return recipe
