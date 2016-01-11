from sqlalchemy import String, Column, Integer, ForeignKey, Index
from sqlalchemy.orm import relationship

from radar.database import db
from radar.models import MetaModelMixin
from radar.models.common import uuid_pk_column, patient_id_column, patient_relationship


class PatientAlias(db.Model, MetaModelMixin):
    __tablename__ = 'patient_aliases'

    id = uuid_pk_column()

    patient_id = patient_id_column()
    patient = patient_relationship('patient_aliases')

    source_group_id = Column(Integer, ForeignKey('groups.id'), nullable=False)
    source_group = relationship('Group')
    source_type_id = Column(String, ForeignKey('source_types.id'), nullable=False)
    source_type = relationship('SourceType')

    first_name = Column(String)
    last_name = Column(String)

Index('patient_aliases_patient_id_idx', PatientAlias.patient_id)
