from pydantic import BaseModel,EmailStr
from typing import List, Any
from fastapi import UploadFile,File,Form

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
class Message(BaseModel):
    question: str
    answer: Any
class Conversation(BaseModel):
    messages: List[Message]

class voiceMessageConversation():
    conversation: List[Message]



# class VoiceObject(BaseModel):
#     conversation: str = Form(...)
#     voiceFile: UploadFile = File(...)