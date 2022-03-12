from typing import Dict, List

from fastapi import APIRouter

from app.models import ScrapedRecipe
from app.schemas import ScrapedResult, ScrapingRequest
from app.service import scrape_recipe

router = APIRouter()


@router.get("/hello", status_code=200)
def hello():
    return {"message": "Hello World"}


@router.post("/", response_model=ScrapedResult, status_code=200)
def scrape(detail: ScrapingRequest):
    scraped_recipes: List[ScrapedRecipe] = []

    for url in detail.urls:
        recipe: ScrapedRecipe = scrape_recipe(url)
        scraped_recipes.append(recipe)

    return ScrapedResult(
        scraped_recipes=scraped_recipes,
        shopping_list=[]
    )

