from datetime import date, timedelta

import pytest

from radar.lib.models import Patient, PatientDemographics, Transplant, DataSource, User
from radar.lib.validation.core import ValidationError
from radar.lib.validation.transplants import TransplantValidation


@pytest.fixture
def patient():
    patient = Patient()
    patient_demographics = PatientDemographics()
    patient_demographics.date_of_birth = date(2000, 1, 1)
    patient.patient_demographics.append(patient_demographics)
    return patient


@pytest.fixture
def transplant(patient):
    transplant = Transplant()
    transplant.data_source = DataSource()
    transplant.patient = patient
    transplant.transplant_date = date(2015, 1, 1)
    transplant.transplant_type = 'LIVE'
    transplant.date_failed = date(2015, 1, 2)
    return transplant


def test_valid(transplant):
    obj = valid(transplant)
    assert obj.transplant_date == date(2015, 1, 1)
    assert obj.transplant_type == 'LIVE'
    assert obj.date_failed == date(2015, 1, 2)


def test_transplant_date_missing(transplant):
    transplant.transplant_date = None
    invalid(transplant)


def test_transplant_date_before_dob(transplant):
    transplant.transplant_date = date(1999, 1, 1)
    invalid(transplant)


def test_transplant_date_future(transplant):
    transplant.transplant_date = date.today() + timedelta(days=1)
    invalid(transplant)


def test_transplant_type_missing(transplant):
    transplant.transplant_type = None
    invalid(transplant)


def test_transplant_type_invalid(transplant):
    transplant.transplant_type = 'FOO'
    invalid(transplant)


def test_date_failed_missing(transplant):
    transplant.date_failed = None
    valid(transplant)


def test_date_failed_before_dob(transplant):
    transplant.date_failed = date(1999, 1, 1)
    invalid(transplant)


def test_date_failed_future(transplant):
    transplant.date_failed = date.today() + timedelta(days=1)
    invalid(transplant)


def test_date_failed_before_transplant_date(transplant):
    transplant.date_failed = transplant.transplant_date - timedelta(days=1)
    invalid(transplant)


def valid(transplant):
    return validate(transplant)


def invalid(transplant):
    with pytest.raises(ValidationError) as e:
        validate(transplant)

    return e


def validate(transplant):
    validation = TransplantValidation()
    ctx = {'user': User(is_admin=True)}
    validation.before_update(ctx, Transplant())
    old_obj = validation.clone(transplant)
    obj = validation.after_update(ctx, old_obj, transplant)
    return obj
