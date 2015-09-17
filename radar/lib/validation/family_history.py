from radar.lib.validation.cohorts import CohortValidationMixin
from radar.lib.validation.core import Field, Validation
from radar.lib.validation.meta import MetaValidationMixin
from radar.lib.validation.patients import PatientValidationMixin
from radar.lib.validation.validators import required, none_if_blank, optional, max_length


class FamilyHistoryValidation(PatientValidationMixin, CohortValidationMixin, MetaValidationMixin, Validation):
    parental_consanguinity = Field([required()])
    family_history = Field([required()])
    other_family_history = Field([none_if_blank(), optional(), max_length(1000)])