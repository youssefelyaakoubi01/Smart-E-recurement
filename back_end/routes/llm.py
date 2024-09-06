from fastapi import APIRouter,UploadFile,File,Form
from serializers.llm import ask_llm_rag,chat_llm,search_offers,analyseCV,analyseCVCarriere,repondreQuestionSimple,VoiceFunctionTraitement
import io
from PyPDF2 import PdfReader
from models.user import Conversation
from groq import Groq 
from models.user import Message
import json
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

@llm_root.post("/voiceMessageConsultation")
async def voiceMessageConsultation(conversation: str = Form(...),voiceFile: UploadFile = File(...)):
   try:
        # file:UploadFile = voiceObject.voiceFile.audio
        conversation_obj = json.loads(conversation)
        conversation_Class = Conversation(**conversation_obj)
        contents = await voiceFile.read()
       
        Whisper_Goq = Groq(api_key="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",)

        filename = "audio.wav"
        transcription = Whisper_Goq.audio.transcriptions.create(
        file=(filename, contents),
        response_format="verbose_json",
        model="whisper-large-v3",)
        print(transcription.text)
        message = Message(question=transcription.text,answer='')
        conversation_Class.messages.append(message)
        
        return VoiceFunctionTraitement(conversation_Class)

   except Exception as e:
         return {"status": "error", "message": str(e)}

# @llm_root.post("/voiceMessageConsultation")
# async def voiceMessageConsultation(vcm: voiceMessageConversation):
#    try:
#         contents =  vcm.audio.file.read()
#         Whisper_Groq_Client = Groq(api_key="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",)

#         filename = "audio.wav"
#         transcription = Whisper_Groq_Client.audio.transcriptions.create(
#         file=(filename, contents),
#         response_format="verbose_json",
#         model="whisper-large-v3",)
#         message = Message(question=transcription.text,answer='')
#         vcm.conversation.append(message)
#         return chat_llm(vcm.conversation)

#    except Exception as e:
#          return {"status": "error", "message": str(e)}
