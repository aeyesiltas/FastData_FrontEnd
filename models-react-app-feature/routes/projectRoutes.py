from app import app
import uuid
from flask import request, Response
from database import db
from models.Projects import Project
import json

@app.route('/project/add', methods=['POST'])
def addProject():
    try:
        projectName = request.form['projectName']
        
        project = Project(id=str(uuid.uuid4()), projectName=projectName)
        db.session.add(project)
        db.session.commit()
        return Response(str(project.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500)


@app.route('/project/get', methods=['GET'])
def getProjects():
    try:
        projects = Project.query.all()
        response = []
        for project in projects:
            response.append({"id":project.id, "name":project.projectName})
        
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500)


# @app.route('/project/deleteById', methods=['DELETE'])
# def deleteById():
#     try:
#         id = request.args.get("id")
#         Project.query.filter(Project.id == id).delete()
#         return Response("Success", status=200)
#     except Exception as e:
#         return Response(str(e), status=500, mimetype='application/json')