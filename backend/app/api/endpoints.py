import uuid
import re
from typing import Dict

from fastapi import APIRouter
from recipe_scrapers import scrape_me

from app.models.models import ScrapedRecipe

router = APIRouter()


@router.get("/hello", status_code=200)
def hello():
    return {"message": "Hello World"}


@router.post("/", response_model=ScrapedRecipe, status_code=200)
def scrape_recipe(detail: Dict):
    print(f"scraping {detail['url']}")
    scraper = scrape_me(detail['url'])
    needle = '\d+'
    recipe = ScrapedRecipe(
        id=uuid.uuid4().hex,
        url=detail['url'],
        recipeYield=int(re.match(needle, scraper.yields()).group(0)),
        name=scraper.title(),
        nutrition=scraper.nutrients(),
        ingredients=scraper.ingredients()
    )

    return recipe
