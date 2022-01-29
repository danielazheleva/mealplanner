import uuid
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
    recipe = ScrapedRecipe(
        id=uuid.uuid4().hex,
        url=detail['url'],
        recipeYield=scraper.yields(),
        name=scraper.title(),
        nutrition=scraper.nutrients(),
        ingredients=scraper.ingredients()
    )

    return recipe
