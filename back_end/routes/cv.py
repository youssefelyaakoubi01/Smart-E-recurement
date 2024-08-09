from fastapi import APIRouter, UploadFile, File
from serializers.cv import search_offers
routerCV = APIRouter()

path_cv= "./cvs/"
@routerCV.post('/cv/uploadCV')
async def uploadCV(file: UploadFile = File(...) ):
    content = await file.read()
    with open(f"{path_cv}{file.filename}","wb") as f:
        f.write(content)
    cv = {"filename":file.filename, "path":f"{path_cv}{file.filename}"}
    print("le cv a été bien enregistré!" )
    return search_offers(cv["path"])

