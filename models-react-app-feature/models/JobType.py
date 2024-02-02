from flask_sqlalchemy import SQLAlchemy
from Projects import Project
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class JobType(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'jobType'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    jobTypeName = db.Column(db.String(80), nullable=False)