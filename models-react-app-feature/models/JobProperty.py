from flask_sqlalchemy import SQLAlchemy
from Projects import Project
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class JobProperty(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'jobProperty'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    jobId = db.Column(db.String(36), db.ForeignKey('job.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    jobWriteModeId = db.Column(db.String(36), db.ForeignKey('jobWriteMode.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    tableActionId = db.Column(db.String(36), db.ForeignKey('jobTableAction.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    sourceSqlScript = db.Column(db.String(80), nullable=False)
    targetTableName = db.Column(db.String(80), nullable=False)
    targetInsertHint = db.Column(db.String(80), nullable=False)
    beforeSqlScript = db.Column(db.String(80), nullable=False)
    afterSqlScript = db.Column(db.String(80), nullable=False)
    partition = db.Column(db.String(80), nullable=False)
    subPartition = db.Column(db.String(80), nullable=False)
    NoParallels = db.Column(db.String(80), nullable=False)
    fetchSize = db.Column(db.String(80), nullable=False)
    bufferSize = db.Column(db.String(80), nullable=False)
    commitSize = db.Column(db.String(80), nullable=False)
    inMemory = db.Column(db.String(80), nullable=False)
    priorityLevel = db.Column(db.String(80), nullable=False)
    
