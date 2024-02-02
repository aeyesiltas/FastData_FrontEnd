from flask_sqlalchemy import SQLAlchemy
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Project(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'project'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    projectName = db.Column(db.String(80), nullable=False)