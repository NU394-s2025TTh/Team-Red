from pinchofyum import scrape_pinchofyum, scrape_recipe_detail
from firebase import upload_recipe

if __name__ == "__main__":
    #print("Scraping recipes...")
    recipes = scrape_pinchofyum()
    #print(f"scraped {len(recipes)} recipes.")

    for r in recipes:
        #print(f"Uploading: {r['title']}")
        upload_recipe(r)

