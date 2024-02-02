from flask_sqlalchemy import SQLAlchemy
from Projects import Project
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class JobWriteMode(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'jobWriteMode'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    jobWriteMode = db.Column(db.String(80), nullable=False)