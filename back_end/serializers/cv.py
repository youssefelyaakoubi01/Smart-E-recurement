import fitz


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extrait le texte d'un fichier PDF donné.

    :param file_path: Le chemin du fichier PDF.
    :return: Le texte extrait du fichier PDF.
    """
    # Ouvrir le document PDF
    pdf_document = fitz.open(file_path)
    
    # Extraire le texte de chaque page du PDF
    text = ""
    for page in pdf_document:
        text += page.get_text()
    
    return text

def search_offers(file_path: str):
    text = extract_text_from_pdf(file_path)
    return {"text":text}
    
