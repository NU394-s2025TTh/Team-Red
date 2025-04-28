# to run -> /Library/Frameworks/Python.framework/Versions/3.11/bin/python3 scraper/pinchofyum.py

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
}

def scrape_pinchofyum():
    url = "https://pinchofyum.com/recipes/popular"
    response = requests.get(url, headers=HEADERS)
    print(f"Status code: {response.status_code}")

    soup = BeautifulSoup(response.content, "html.parser")
    recipe_links = soup.select("article.carousel-cell a")
    print(f"Found {len(recipe_links)} recipes")

    recipes = []
    for link in recipe_links[:5]:  # 5 is limit for testing
        href = link.get("href")
        full_link = href if href.startswith("http") else f"https://pinchofyum.com{href}"

        full_recipe = scrape_recipe_detail(full_link)

        if full_recipe:
            full_recipe["link"] = full_link
            full_recipe["source"] = "Pinch of Yum"
            recipes.append(full_recipe)

    return recipes


import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def scrape_recipe_detail(url):
    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')

    # title
    title_tag = soup.find('h1', class_='entry-title mb-2')
    title = title_tag.text.strip() if title_tag else "No title"

    # rating
    rating_tag = soup.find('span', class_='tasty-recipes-ratings-buttons')
    rating = rating_tag.get('data-tr-default-rating', "No rating") if rating_tag else "No rating"

    # photo url
    photo_tag = soup.find('a', class_='tasty-pins-banner-image-link')
    if not photo_tag:
        return None

    
    img_tag = photo_tag.find('img')
    if img_tag:
        srcset = img_tag.get('srcset', '')
        image_url = next((url.split(' ')[0] for url in srcset.split(',') if '768w' in url), None)

        if not image_url:
            image_url = img_tag.get('src', None)

    else:
        image_url = None

    # ingredients
    ingredients = []
    ingredient_items = soup.find_all('li', {'data-tr-ingredient-checkbox': True})
    for item in ingredient_items:
        full_text = item.get_text(separator=" ", strip=True)
        ingredients.append(full_text)

    # instructions
    instructions = []
    instructions_wrapper = soup.find("div", class_="tasty-recipes-instructions")
    if instructions_wrapper:
        instruction_steps = instructions_wrapper.find_all("li")
        for step in instruction_steps:
            step_text = step.get_text(strip=True)
            if step_text:
                instructions.append(step_text)

    return {
        "title": title,
        "rating": rating,
        "photoUrl": image_url,
        "ingredients": ingredients,
        "instructions": instructions
    }


print("Script is running...") 

if __name__ == "__main__":
    print("here")
    recipes = scrape_pinchofyum()

    print(f"Number of recipes scraped: {len(recipes)}")


    for r in recipes:
        print(r["title"])
        print(r["link"])
        print(r["photoUrl"])
        print(f"Ingredients: {len(r['ingredients'])}")
        print(f"Instructions: {len(r['instructions'])}")
        print("---")
