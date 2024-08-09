from pydantic import BaseModel,EmailStr

class UserSignup(BaseModel):
    firstName: str 
    lastName: str
    username: EmailStr  
    password: str  
    
class UserLogin(BaseModel):
    username: str 
    password: str

class Offre(BaseModel):
    categorie:str
    description: str
