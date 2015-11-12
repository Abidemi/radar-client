from radar.models import TRANSPLANT_TYPES
from radar.validation.core import Validation, Field, pass_new_obj, ValidationError
from radar.validation.data_sources import DataSourceValidationMixin
from radar.validation.meta import MetaValidationMixin
from radar.validation.patients import PatientValidationMixin
from radar.validation.validators import required, valid_date_for_patient, optional, in_


class TransplantValidation(PatientValidationMixin, DataSourceValidationMixin, MetaValidationMixin, Validation):
    transplant_date = Field([required(), valid_date_for_patient()])
    transplant_type = Field([required(), in_(TRANSPLANT_TYPES.keys())])
    date_failed = Field([optional(), valid_date_for_patient()])

    @pass_new_obj
    def validate_date_failed(self, obj, date_failed):
        if date_failed < obj.transplant_date:
            raise ValidationError('Must be on or after transplant date.')

        return date_failed