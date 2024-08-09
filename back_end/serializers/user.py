from fastapi import HTTPException, status
from pydantic import BaseModel
from bcrypt import hashpw, checkpw, gensalt
from models.user import UserSignup,UserLogin
from config.config import users_collection

# Dummy database to store user information (replace with SQLite later)


# Function to hash password
def get_password_hash(password: str):
    salt = gensalt()
    return hashpw(password.encode('utf-8'), salt)

# Function to verify password
def verify_password(plain_password: str, hashed_password: str):
    return checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Function to get user by username
def get_user(username: str):
    user = users_collection.find_one(
        {"username":username}
    )

    return user
  


# Route for user signup
def signup(user_signup: UserSignup):
    user = get_user(user_signup.username)
    if user:
        #raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Utilisateur déjà existe!")
        return None
    else:
        hashed_password = get_password_hash(user_signup.password)
    # Créer une instance de UserSignup en utilisant les valeurs de user_signup
        user = UserSignup(
            firstName=user_signup.firstName,
            lastName=user_signup.lastName,
            username=user_signup.username,
            password=hashed_password
        )
        user_final = dict(user)
        users_collection.insert_one(user_final)
        return user

# Route for user login
def login(userlog: UserLogin):
    user = get_user(userlog.username) 
    if not user:
        return None
        #raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Utilisateur invalide")
    if not verify_password(userlog.password, user["password"] ):
        #raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Mot de passe incorrect")
        return None
    user = UserSignup(**user)
    return user
