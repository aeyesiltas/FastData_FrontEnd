from app import app
import uuid
from flask import request, Response, jsonify
from database import db
from models.JobType import JobType
from models.TimeConditionType import TimeConditionType
from models.JobsScheduled import JobsScheduled
from models.JobsScheduledType import JobsScheduledType
from models.JobProperty import JobProperty
from models.Jobs import Job
from models.Users import User
from models.JobType import JobType
from models.JobTableAction import JobTableAction
from models.JobWriteMode import JobWriteMode
from datetime import datetime
from sqlalchemy.exc import IntegrityError
import json

@app.route('/job/getAll', methods=['GET'])
def getAll():
    try:
        jobs = Job.query.all()
        response = []
        for job in jobs:
            response.append({"id":job.id, "name": job.jobName, "createdDate":str(job.createdDate), "modifiedDate": str(job.modifiedDate)})
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500)

@app.route('/jobType/add', methods=['POST'])
def addJobType():
    try:
        jobTypeName = request.form['jobTypeName']
        
        jobType = JobType(id=str(uuid.uuid4()), jobTypeName=jobTypeName)
        db.session.add(jobType)
        db.session.commit()
        return Response(str(jobType.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500)
    

@app.route('/timeConditionType/add', methods=['POST'])
def addTimeConditionType():
    try:
        timeConditionType = request.form['timeConditionType']
        
        timeCondition = TimeConditionType(id=str(uuid.uuid4()), timeConditionType=timeConditionType)
        db.session.add(timeCondition)
        db.session.commit()
        return Response(str(timeCondition.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500)
    

@app.route('/jobScheduledType/add', methods=['POST'])
def addjobScheduledType():
    try:
        timeConditionTypeId = request.form['timeConditionTypeId']
        scheduledTypeName = request.form['scheduledTypeName']
        scheduledConditions = request.form['scheduledConditions']
        
        jobScheduled = JobsScheduledType(id=str(uuid.uuid4()), timeConditionTypeId=timeConditionTypeId, scheduledTypeName=scheduledTypeName, scheduledConditions=scheduledConditions)
        db.session.add(jobScheduled)
        db.session.commit()
        return Response(str(jobScheduled.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500)
    


@app.route('/jobScheduled/add', methods=['POST'])
def addJobScheduled():
    try:
        scheduledTypeId = request.form['scheduledTypeId']
        jobId = request.form['jobId']
        scheduledTime = datetime.now()
        
        jobScheduled = JobsScheduled(id=str(uuid.uuid4()), scheduledTypeId=scheduledTypeId, jobId=jobId, scheduledTime=scheduledTime)
        db.session.add(jobScheduled)
        db.session.commit()
        return Response(str(jobScheduled.id), status=200, mimetype='application/json')
    except Exception as e:
        return Response(str(e), status=500)

@app.route('/job/add', methods=['POST'])
def addJob():
    try:

        data = request.json['formData']

        users = User.query.all()
        userId = ''
        for i in users:
            if i.username == data['email']:
                userId = i.id
        if userId == '':
            return Response(str(e), status=401)
        
        ## DEFAULT JOBTYPE ID
        jobTypeId = str(uuid.uuid4())
        if len(list(JobType.query.all())) == 0:
            jobType = JobType(id=jobTypeId,jobTypeName="Default")
            db.session.add(jobType)
            db.session.commit()

        else:
            jobTypeId = JobType.query.all()[0].id

        folderId = data['folderId']
        jobName = data['jobName']
        
        isActive = data['isActive']
        isCsv = data['isCsv']
        createdDate = datetime.now()
        modifiedDate = datetime.now()

        isActive = True if isActive == 1 else False
        
        jobId = str(uuid.uuid4())
        job = Job(id=jobId, folder_id=folderId, jobTypeId=jobTypeId, isCsv=isCsv, parentJobTypeId=jobTypeId, createdUserId=userId, modifiedUserId=userId, parentJobId=str(uuid.uuid4()), jobName=jobName,isActive=isActive, createdDate=createdDate, modifiedDate=modifiedDate)
        

        ## Table Action
        tableActionId = str(uuid.uuid4())
        tableAction = JobTableAction(id = tableActionId, jobTableAction=f'default{tableActionId}')
        db.session.add(tableAction)
        db.session.commit()

        ## JobWriteMode
        jobWriteModeId = str(uuid.uuid4())
        jobWriteMode = JobWriteMode(id = jobWriteModeId, jobWriteMode=f'default{jobWriteModeId}')
        db.session.add(jobWriteMode)
        db.session.commit()

        ## Job Properties
        sourceSqlScript = data['source']
        targetTableName = ''
        targetInsertHint = data['targetInsertHint']
        beforeSqlScript = data['beforeSql']
        afterSqlScript = data['afterSql']
        partition = data['partition']
        subPartition = ''
        NoParallels = data['notParallel']
        fetchSize = data['fetchSize']
        bufferSize = data['bufferSize']
        commitSize = data['targetCommitSize']
        inMemory = data['inMemory']
        priorityLevel = data['priorityLevel']

        jobProperties = JobProperty(id=str(uuid.uuid4()), jobWriteModeId=jobWriteModeId, tableActionId=tableActionId, jobId=jobId, targetTableName=targetTableName, sourceSqlScript=sourceSqlScript, targetInsertHint=targetInsertHint, beforeSqlScript = beforeSqlScript, afterSqlScript=afterSqlScript, partition = partition, subPartition = subPartition,NoParallels = NoParallels,fetchSize = fetchSize, bufferSize = bufferSize,commitSize = commitSize,inMemory=inMemory, priorityLevel=priorityLevel)
        
        db.session.add(job)
        db.session.commit()
        db.session.add(jobProperties)
        db.session.commit()
        return Response(str(job.id), status=200, mimetype='application/json')
    except IntegrityError:
        db.session.rollback()
        return Response("duplicate-name", status=200)
    except Exception as e:
        return Response(str(e), status=500)
    

@app.route('/job/getByFolderId', methods=['GET'])
def getByFolderId():
    try:
        folderId = request.args.get("folderId")
        jobs = Job.query.filter(Job.folder_id == folderId)
        response = []
        for job in jobs:
            response.append({"id":job.id, "name":job.jobName})

        
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')
    

@app.route('/job/getById', methods=['GET'])
def getJobById():
    try:
        id = request.args.get("id")
        jobs = Job.query.filter(Job.id == id)
        response = []
        for job in jobs:
            response.append(job.as_dict())

        
        return Response(json.dumps(response), status=200)
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')
    

@app.route('/job/deleteById', methods=['POST'])
def deleteById():
    try:
        id = request.form['id']
        Job.query.filter(Job.id == id).delete()
        return Response("Success", status=200)
    except Exception as e:
        return Response(str(e), status=500, mimetype='application/json')