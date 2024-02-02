from flask_sqlalchemy import SQLAlchemy
from Projects import Project
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Folder(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'folder'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    parentFolder_id = db.Column(db.String(36), default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('project.id'), nullable=False)
    folderName = db.Column(db.String(80), nullable=False)