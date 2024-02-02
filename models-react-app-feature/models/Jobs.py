import unicodedata
from flask_sqlalchemy import SQLAlchemy
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

from dataclasses import dataclass


@dataclass
class Job(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'job'
    id = db.Column(db.String(36), primary_key=True,default=lambda: str(uuid.uuid4()))
    folder_id = db.Column(db.String(36), db.ForeignKey('folder.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    jobTypeId = db.Column(db.String(36), db.ForeignKey('jobType.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    parentJobTypeId = db.Column(db.String(36), db.ForeignKey('jobType.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    createdUserId = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    modifiedUserId = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    parentJobId = db.Column(db.String(36), nullable=False, default=lambda: str(uuid.uuid4()))
    isCsv = db.Column(db.String(36), nullable=False)
    jobName = db.Column(db.String(80), unique=True, nullable=False)
    isActive = db.Column(db.Boolean, nullable=False)
    createdDate = db.Column(db.DateTime, nullable=False)
    modifiedDate = db.Column(db.DateTime, nullable=False)

    def as_dict(self):
       return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}