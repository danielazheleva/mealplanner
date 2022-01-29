from typing import Dict

from fastapi import APIRouter
from recipe_scrapers import scrape_me

router = APIRouter()


@router.get("/hello", status_code=200)
def hello():
    return {"message": "Hello World"}


@router.post("/",  status_code=200)
def scrape_recipe(detail: Dict):
    print(f"scraping {detail['url']}")
    scraper = scrape_me(detail['url'])

    return {"message": "Hello World"}
