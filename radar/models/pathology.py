from sqlalchemy import Column, Integer, ForeignKey

from radar.models.common import DataSource, PatientMixin, MetadataMixin


class Pathology(DataSource, PatientMixin, MetadataMixin):
    __tablename__ = 'pathology'

    id = Column(Integer, ForeignKey('data_sources.id'), primary_key=True)

    def can_view(self, user):
        return self.patient.can_view(user)

    def can_edit(self, user):
        return self.patient.can_edit(user)

    __mapper_args__ = {
        'polymorphic_identity': 'pathology',
    }