import firebase_admin
from firebase_admin import credentials, firestore
import re

cred = credentials.Certificate("scraper/priv_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def sanitize_title(title):
    #no spaces n only alphanumeric characters
    return re.sub(r'[^a-zA-Z0-9_]', '_', title.lower().replace(" ", "_"))

def upload_recipe(recipe):
    collection_name = "social_recipes"
    document_name = sanitize_title(recipe["title"])

    doc_ref = db.collection(collection_name).document(document_name)
    doc_ref.set(recipe)