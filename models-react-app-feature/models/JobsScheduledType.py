from flask_sqlalchemy import SQLAlchemy
from database import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class JobsScheduledType(db.Model):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'jobsScheduledType'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    timeConditionTypeId = db.Column(db.String(36), db.ForeignKey('timeConditionType.id'), nullable=False, default=lambda: str(uuid.uuid4()))
    scheduledTypeName = db.Column(db.String(80), nullable=False)
    scheduledConditions = db.Column(db.String(80), nullable=False)