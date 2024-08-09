from fastapi import APIRouter
from serializers.user import login,signup
from models.user import UserLogin,UserSignup

user_root = APIRouter()

# Route for user signup
@user_root.post("/signup")
async def signup_route(user_signup: UserSignup):
    return signup(user_signup)

# Route for user login
@user_root.post("/login")
async def login_route(userlog: UserLogin):
    return login(userlog)

