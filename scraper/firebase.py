import firebase_admin
from firebase_admin import credentials, firestore
import re
import os
from dotenv import load_dotenv


load_dotenv()

# using local .env (in .gitignore)
firebase_config = {
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
    "universe_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN"),
}

# firebase 
cred = credentials.Certificate(firebase_config)
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