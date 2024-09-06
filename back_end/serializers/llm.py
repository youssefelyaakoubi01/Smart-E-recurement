from groq import Groq
from langchain_groq import ChatGroq
from rag.chercher_similartite import fun_chercher_similarite
from rag.chercher_similartite_offres import fun_chercher_similarite_offers
from dotenv import load_dotenv
load_dotenv()
import os
from fastapi import UploadFile,File
from models.user import Message,Conversation

GROQ_API_KEY = os.getenv('GROQ_API_KEY')


client = ChatGroq(
        model="llama-3.1-70b-versatile",
        api_key="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",
        temperature=0.5 )

def ask_llm_rag(question):
    full_prompt = fun_chercher_similarite(question)
    reponse = client.invoke(full_prompt).content
    print(reponse)
    return reponse

def chat_llm(conversation: Conversation):
        print(conversation.messages)
        reponse = client.invoke(f"system: Lire toute la conversation et répondre directement à la dernière question. Retourner uniquement la réponse directe. {conversation.messages}").content
        print(reponse)
        return reponse
def search_offers(extracted_text):
        
        test_client = ChatGroq(
                model="llama-3.1-70b-versatile",
                api_key="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",
                temperature=0.5 )
        reponse = test_client.invoke("system: Traduire le CV en anglais, résumer le CV, et extraire les champs nécessaires pour trouver des offres pertinentes pour ce profil. Voici le CV : " + extracted_text)
        print(reponse.content)
        offres=fun_chercher_similarite_offers(reponse)
        print(offres)
        return offres
def analyseCV(cv):
        print(cv)
        resultatAnalyse= client.invoke(f"system: Analyse ce CV pour voir s'il respecte les normes d'un CV professionnel. Vérifie si les sections suivantes sont présentes et bien structurées : Informations personnelles, Résumé, Expérience professionnelle, Compétences, Éducation, Certifications, et Autres. Note les sections manquantes ou mal structurées, et vérifie si le texte est clair et sans erreurs."+ cv).content
        
        return resultatAnalyse


def analyseCVCarriere(cv):
        Domaine = client.invoke("Pourriez-vous déduire le domaine du travail /poste du travail en analysant le CV suivant : "+ cv)
        print(cv)
        resultatAnalyse= client.invoke(f"Voici un CV pour un candidat cherchant un poste dans {Domaine}. Analyse ce CV en fonction des exigences typiques pour ce type de poste. Identifie les points forts du candidat, les aspects qui nécessitent une amélioration, et recommande des compétences ou formations supplémentaires pour renforcer ce profil par rapport aux attentes du poste."+ cv).content
        return resultatAnalyse

def repondreQuestionSimple(question:str):
        reponse = client.invoke(f"system: Répondez à cette question: {question}").content
        message = Message(question=question,answer=reponse)
        print(message)
        return message

def VoiceFunctionTraitement(conversation: Conversation):
        print(conversation.messages)
        reponse = client.invoke(f"system: Lire toute la conversation et répondre directement à la dernière question. Retourner uniquement la réponse directe. {conversation.messages}").content
        print(reponse)
        ResponseMessage = Message(question=conversation.messages[-1].question,answer=reponse )
        return ResponseMessage