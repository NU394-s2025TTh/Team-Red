from pinchofyum import scrape_pinchofyum, scrape_recipe_detail
from firebase import upload_recipe


recipes = scrape_pinchofyum()

for r in recipes:
    upload_recipe(r)


recipes = scrape_pinchofyum()
