from pydantic import BaseModel, Field
from typing import List
from langchain_groq import ChatGroq
from langchain.vectorstores.chroma import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_community.llms.ollama import Ollama
from langchain.output_parsers import PydanticOutputParser
from langchain.chains import LLMChain
from rag.get_embedding_function_m import get_embedding_function
from langchain.prompts import ChatPromptTemplate

CHROMA_PATH = "./chroma_offres"

class Offre(BaseModel):
    categorie: str = Field(description="La catégorie de l'offre d'emploi(Data Scientist ou  Database_Administrator ou Java Developper ou Network_Administrator ou ML engineer)")
    description: str = Field(description="La description détaillée de l'offre d'emploi avec le nom d'entreprise et lieu,salaire.... ")

class ListeOffres(BaseModel):
    offres: List[Offre] = Field(description="Liste des offres d'emploi pertinentes")

def fun_chercher_similarite_offers(cv):
    # Préparation de la base de données
    print("\n **************** Début de préparation de la base de données ******************\n ")
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    print("\n **************** Fin de préparation de la base de données ******************\n\n ")

    # Recherche dans la base de données
    print(" **************** Début de l'opération 'Chercher dans la base de données (ChromaDB)' ******************\n ")
    results = db.similarity_search_with_score(cv, k=25)
    if len(results) == 0:
        print("Désolé, aucune offre d'emploi pertinente n'a été trouvée dans la base de données.")
        return []
    print("**************** Fin de l'opération 'Chercher dans la base de données (ChromaDB)' ******************\n ")

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
    # Définition du parser
    parser = PydanticOutputParser(pydantic_object=ListeOffres)

    # Configuration du Template Prompt
    prompt = PromptTemplate(
        template="Vous êtes un assistant RH expert. Analysez le CV fourni et les offres d'emploi disponibles. "
                 "Retournez une liste des offres les plus pertinentes sous forme d'objets structurés. "
                 "CV : {cv}\n\nOffres d'emploi disponibles : {context}\n\n"
                 "{format_instructions}",
        input_variables=["cv", "context"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    
    # Création du modèle et de la chaîne
    client =ChatGroq(
        model="llama-3.1-70b-versatile",
        api_key="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",
        temperature=0 )
  
    
    prompt = prompt.format_prompt(cv=cv, context=context_text)
    response = client.invoke(prompt)
    print(prompt)
    print("\n ....")
    print(response.content)

    
    # Exécution de la chaîne
    
    
   
    # Parsing de la réponse
    try:
        parsed_output = parser.parse(response.content)
        return parsed_output.offres
    except Exception as e:
        print(f"Erreur lors du parsing de la réponse : {e}")
        return []


