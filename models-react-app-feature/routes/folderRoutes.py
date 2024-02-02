from app import app
import uuid
from flask import request, Response
from database import db
from models.Folders import Folder
from models.Projects import Project
import json

@app.route('/folder/add', methods=['POST'])
def addFolder():
    try:
        folderName = request.form['folderName']
        projectId  = request.form['projectId']
        parentFolderId  = request.form['parentFolderId']
        isSubFolder = request.form['isSubFolder']

        saveId = str(uuid.uuid4())
        if parentFolderId == '':
            parentFolderId = saveId
        
        if isSubFolder == 'true':
            projectId = Folder.query.filter(Folder.id == parentFolderId)[0].project_id
        
        folder = Folder(id=saveId, parentFolder_id=parentFolderId, project_id=projectId, folderName=folderName)
        db.session.add(folder)
        db.session.commit()
        return Response(str(folder.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')
    
@app.route('/folder/getByProjectId', methods=['GET'])
def getByProjectId():
    try:
        projectId = request.args.get("projectId")
        folders = Folder.query.filter(Folder.project_id == projectId)
        response = []
        for folder in folders:
            response.append({"id":folder.id, "name":folder.folderName})

        
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')
    
    
@app.route('/folder/getFolderById', methods=['GET'])
def getFolderById():
    try:
        folderId = request.args.get("folderId")
        folders = Folder.query.filter(Folder.id == folderId)
        response = []
        for folder in folders:
            response.append({"id":folder.id, "name":folder.folderName})

        
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')
    
# @app.route('/folder/deleteById', methods=['DELETE'])
# def deleteById():
#     try:
#         id = request.args.get("id")
#         Folder.query.filter(Folder.id == id).delete()
#         return Response("Success", status=200)
#     except Exception as e:
#         return Response(str(e), status=500, mimetype='application/json')