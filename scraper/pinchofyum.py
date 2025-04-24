# to run -> /Library/Frameworks/Python.framework/Versions/3.11/bin/python3 scraper/pinchofyum.py

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
}

def scrape_pinchofyum():
    url = "https://pinchofyum.com/recipes"
    response = requests.get(url, headers=HEADERS)
    print(f"Status code: {response.status_code}")

    soup = BeautifulSoup(response.content, "html.parser")
    recipe_links = soup.select('ul.md\\:grid a')
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



def scrape_recipe_detail(url):
    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')

    #title
    title_tag = soup.find('h1', class_='entry-title mb-2')
    title = title_tag.text.strip() if title_tag else "No title"

    #rating
    rating_tag = soup.find('span', class_='tasty-recipes-ratings-buttons')
    rating = rating_tag.get('data-tr-default-rating', "No rating") if rating_tag else "No rating"


    #photo url
    photo_tag = soup.find('figure', class_='wp-block-image')
    img_tag = photo_tag.find('img') if photo_tag else None
    photo_url = img_tag['src'] if img_tag else "No photo"

    #ingredients
    ingredients = []
    ingredient_items = soup.find_all('li', {'data-tr-ingredient-checkbox': True})
    for item in ingredient_items:
        full_text = item.get_text(separator=" ", strip=True)
        ingredients.append(full_text)

    #instructions
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
        "photoUrl": photo_url,
        "ingredients": ingredients,
        "instructions": instructions
    }

if __name__ == "__main__":
    recipes = scrape_pinchofyum()

    """
    for r in recipes:
        print(r["title"])
        print(r["link"])
        print(r["photoUrl"])
        print(f"Ingredients: {len(r['ingredients'])}")
        print(f"Instructions: {len(r['instructions'])}")
        print("---")
    """