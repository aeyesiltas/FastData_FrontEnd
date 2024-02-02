from app import app
import uuid
from flask import request, Response, jsonify
from database import db
from models.Projects import Project
from models.Jobs import Job
from models.Folders import Folder

@app.route('/api/GetSideMenuList', methods=['GET'])
def getSideMenuList():
    try:
        jobs = Job.query.all()
        folders = Folder.query.all()
        projects = Project.query.all()

        projectChildren = dict()
        folderChildren = dict()

        for i in jobs:
            if i.folderId not in folderChildren.ids():
                folderChildren[i.folderId] = []
                folderChildren[i.folderId].append(i)
            else:
                folderChildren[i.folderId].append(i)
            
        for i in folders:
            if i.projectId not in projectChildren.ids():
                projectChildren[i.projectId] = []
                projectChildren[i.projectId].append(i)
            else:
                projectChildren[i.projectId].append(i)
        
        print(folderChildren)

        response = dict()
        response['projects'] = []
        
        for i in projects:
            response['projects'].append({"projectName": i.projectName, "projectId": i.id, 'folders': []})
            if i.id in projectChildren.ids():
                for j in projectChildren[i.id]:
                    response['projects'][-1]['folders'].append({"folderName": j.folderName, "folderId": j.id, 'jobs': []})
                    if j.id in folderChildren.ids():
                        for k in folderChildren[j.id]:
                            response['projects'][-1]['folders'][-1]['jobs'].append({"jobName": k.jobName, "jobId": k.id})

        return jsonify(response)
    except Exception as e:
        return Response(str(e), status=500)

@app.route('/api/hierarchy')
def get_hierarchy():
    projects = Project.query.all()

    hierarchy = []
    for project in projects:
        project_data = {'id': project.id, 'name':project.projectName, 'folders': []}
        folders = Folder.query.filter(Folder.project_id == project.id)
        folders = [i for i in folders if i.parentFolder_id == i.id]
        project_data['folders'] = build_folder_hierarchy(folders)
        hierarchy.append(project_data)

    return jsonify(hierarchy)


def build_folder_hierarchy(folders):
    hierarchy = []
    for folder in folders:
        pfolder_data = {'id': folder.id, 'name': folder.folderName,'folders': []}
        subFolders = Folder.query.filter(Folder.project_id==folder.project_id, Folder.parentFolder_id == Folder.parentFolder_id, Folder.id != folder.id )
        pfolder_data['folders'] = [{'id': f.id, 'name':f.folderName, 'jobs':[]} for f in subFolders]

        for pfolder in pfolder_data['folders']:
            jobs = Job.query.filter(Job.folder_id==pfolder['id'])
            pfolder_data['jobs'] = [{'id': job.id, 'name':job.jobName} for job in jobs]
        hierarchy.append(pfolder_data)

    return hierarchy


# @app.route('/api/get2', methods=['GET'])
# def get_hierarchical_data():
#     projects = Project.query.all()

#     data = []
#     for project in projects:
#         project_data = {
#             'id': project.id,
#             'name': project.projectName,
#             'folders': []
#         }

#         folders = Folder.query.filter(Folder.project_id == project.id)
#         folders = [i for i in folders if i.parentFolder_id == i.id]

#         for folder in folders:
#             folder_data = {
#                 'id': folder.id,
#                 'name': folder.folderName,
#                 'folders':[],
#                 'jobs': []
#             }

#             folder_data['folders'] = get_children(folder.id)
#             folder_data['jobs'] = Job.query.filter(Job.folder_id == folder.id)
#             # Recursive function to get child folders and jobs
            
#             project_data['folders'].append(folder_data)

#         data.append(project_data)

#     return jsonify(data)

# def get_children(id):
#     folders = Folder.query.filter(Folder.parentFolder_id == id)
#     folders = [i for i in folders if i.parentFolder_id != i.id]
#     results = []
#     for i in folders:
#         folder_data = {
#             'id': i.id,
#             'name': i.folderName,
#             'folders':[],
#             'jobs': []
#         }
#         folder_data['folders'] = get_children(i.id)
#         folder_data['jobs'] = Job.query.filter(Job.folder_id == i.id)
#         results.append(folder_data)
    
#     return results


@app.route('/api/get2', methods=['GET'])
def get_hierarchical_data():
    projects = Project.query.all()

    data = []
    for project in projects:
        project_data = {
            'id': project.id,
            'name': project.projectName,
            'type': "project",
            'children': []
        }

        folders = Folder.query.filter(Folder.project_id == project.id)
        folders = [i for i in folders if i.parentFolder_id == i.id]

        for folder in folders:
            folder_data = {
                'id': folder.id,
                'name': folder.folderName,
                'type': "folder",
                'children': []
            }

            folderChildren = get_children(folder.id)
            for i in folderChildren:
                folder_data['children'].append(i)
                            
            jobChildren = Job.query.filter(Job.folder_id == folder.id)
            for i in jobChildren:
                folder_data['children'].append({"id": i.id, "name":i.jobName, 'type': "job", "children": []})
            # Recursive function to get child folders and jobs
            
            project_data['children'].append(folder_data)

        data.append(project_data)

    return jsonify(data)

def get_children(id):
    folders = Folder.query.filter(Folder.parentFolder_id == id)
    folders = [i for i in folders if i.parentFolder_id != i.id]
    results = []
    for i in folders:
        folder_data = {
            'id': i.id,
            'name': i.folderName,
            'type': "folder",
            'children':[]
        }

        folderChildren = get_children(i.id)
        for j in folderChildren:
            folder_data['children'].append(j)
        
        jobChildren = Job.query.filter(Job.folder_id == i.id)
        for j in jobChildren:
            folder_data['children'].append({"id": j.id, "name":j.jobName, 'type': "job", "children": []})

        results.append(folder_data)
    
    return results