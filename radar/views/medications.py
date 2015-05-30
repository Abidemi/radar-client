from flask import Blueprint

from radar.lib.forms.medications import MedicationForm
from radar.models.medications import Medication
from radar.views.patient_data import PatientDataDeleteView, PatientDataListAddView, PatientDataListEditView, \
    PatientDataListDetailView, PatientDataListView

bp = Blueprint('medications', __name__)


def get_medications(patient):
    medications = Medication.query\
        .filter(Medication.patient == patient)\
        .order_by(Medication.from_date.desc(), Medication.to_date.desc(), Medication.name.asc())\
        .all()
    return medications


def get_medication(patient, medication_id):
    medication = Medication.query\
        .filter(Medication.id == medication_id)\
        .filter(Medication.patient == patient)\
        .first_or_404()
    return medication


class MedicationListView(PatientDataListView):
    def get_objects(self, patient):
        return get_medications(patient)

    def get_template_name(self):
        return 'patient/medications.html'


class MedicationListAddView(PatientDataListAddView):
    def get_objects(self, patient):
        return get_medications(patient)

    def new_object(self, patient):
        return Medication(patient=patient)

    def get_form(self, obj):
        return MedicationForm(obj=obj)

    def success_endpoint(self):
        return 'medications.view_medication_list'

    def get_template_name(self):
        return 'patient/medications.html'


class MedicationListEditView(PatientDataListEditView):
    def get_object(self, patient, medication_id):
        return get_medication(patient, medication_id)

    def get_objects(self, patient):
        return get_medications(patient)

    def get_form(self, obj):
        return MedicationForm(obj=obj)

    def success_endpoint(self):
        return 'medications.view_medication_list'

    def get_template_name(self):
        return 'patient/medications.html'


class MedicationDeleteView(PatientDataDeleteView):
    def get_object(self, patient, medication_id):
        return get_medication(patient, medication_id)

    def success_endpoint(self):
        return 'medications.view_medication_list'


bp.add_url_rule('/', view_func=MedicationListView.as_view('view_medication_list'))
bp.add_url_rule('/add/', view_func=MedicationListAddView.as_view('add_medication'))
bp.add_url_rule('/<int:medication_id>/edit/', view_func=MedicationListEditView.as_view('edit_medication'))
bp.add_url_rule('/<int:medication_id>/delete/', view_func=MedicationDeleteView.as_view('delete_medication'))
