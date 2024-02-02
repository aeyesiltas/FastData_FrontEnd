from flask_sqlalchemy import SQLAlchemy
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class JobsScheduled(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'jobsScheduled'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    scheduledTypeId = db.Column(db.String(36), db.ForeignKey('jobsScheduledType.id'), nullable=False)
    jobId = db.Column(db.String(36), db.ForeignKey('job.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    scheduledTime = db.Column(db.DateTime, nullable=False)