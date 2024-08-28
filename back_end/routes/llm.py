from fastapi import APIRouter,UploadFile,File
from serializers.llm import ask_llm_rag,chat_llm,search_offers,analyseCV,analyseCVCarriere
import io
from PyPDF2 import PdfReader
from models.user import Conversation
llm_root = APIRouter()

@llm_root.get('/consultation_rag/{cv}')
def pose_question(cv):
    return ask_llm_rag(cv)

@llm_root.post('/ask_llm')
def pose_question(conversation: Conversation):
    print(conversation.messages)
    return chat_llm(conversation)

@llm_root.post("/search_offers")
async def searchOff(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Extraction du texte
        pdf_file = io.BytesIO(contents)
        pdf_reader = PdfReader(pdf_file)
        extracted_text = ""
        
        for page in pdf_reader.pages:
            extracted_text += page.extract_text() + "\n"
        print(extracted_text)
        return search_offers(extracted_text)
    except Exception as e:
         return {"status": "error", "message": str(e)}


@llm_root.post("/analyse_cv_forme")
async def uploadAndAnalyseCV(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Extraction du texte
        pdf_file = io.BytesIO(contents)
        pdf_reader = PdfReader(pdf_file)
        extracted_text = ""
        
        for page in pdf_reader.pages:
            extracted_text += page.extract_text() + "\n"
        print(extracted_text)
        return analyseCV(extracted_text)
    except Exception as e:
         return {"status": "error", "message": e}


@llm_root.post("/analyse_cv_carriere")
async def uploadAndAnalyseCV(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Extraction du texte
        pdf_file = io.BytesIO(contents)
        pdf_reader = PdfReader(pdf_file)
        extracted_text = ""
        
        for page in pdf_reader.pages:
            extracted_text += page.extract_text() + "\n"
        print(extracted_text)
        return analyseCVCarriere(extracted_text)
    except Exception as e:
         return {"status": "error", "message": e}


