from radar.api.serializers.diagnoses import CohortDiagnosisSerializer, DiagnosisSerializer
from radar.lib.models import CohortDiagnosis, Diagnosis, DIAGNOSIS_BIOPSY_DIAGNOSES, DIAGNOSIS_KARYOTYPES
from radar.lib.validation.diagnoses import DiagnosisValidation
from radar.lib.views.codes import CodedIntegerListView
from radar.lib.views.cohorts import CohortObjectViewMixin
from radar.lib.views.core import ListModelView
from radar.lib.views.patients import PatientObjectDetailView, PatientObjectListView


class DiagnosisListView(CohortObjectViewMixin, PatientObjectListView):
    serializer_class = DiagnosisSerializer
    validation_class = DiagnosisValidation
    model_class = Diagnosis


class DiagnosisDetailView(CohortObjectViewMixin, PatientObjectDetailView):
    serializer_class = DiagnosisSerializer
    validation_class = DiagnosisValidation
    model_class = Diagnosis


class CohortDiagnosisListView(ListModelView):
    serializer_class = CohortDiagnosisSerializer
    model_class = CohortDiagnosis


class DiagnosisBiopsyDiagnosesListView(CodedIntegerListView):
    items = DIAGNOSIS_BIOPSY_DIAGNOSES


class DiagnosisKaryotypeListView(CodedIntegerListView):
    items = DIAGNOSIS_KARYOTYPES
