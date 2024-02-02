from flask_sqlalchemy import SQLAlchemy
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'user'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    