from fastapi import APIRouter,UploadFile,File
from serializers.llm import ask_llm_rag,chat_llm,search_offers
import io
from PyPDF2 import PdfReader

llm_root = APIRouter()

@llm_root.get('/search_offers_rag/{cv}')
def pose_question(cv):
    return ask_llm_rag(cv)

@llm_root.get('/ask_llm/{question}')
def pose_question(question):
    return chat_llm(question)

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




