from __future__ import print_function

import logging

from flask import Flask
from sqlalchemy import event

from radar_api.auth import require_login, force_password_change
from radar_api.views import consultants
from radar_api.views import forgot_password
from radar_api.views import patient_consultants
from radar_api.views import stats
from radar_api.views import diagnoses
from radar_api.views import family_histories
from radar_api.views import logout
from radar_api.views import pathology
from radar_api.views import patient_addresses
from radar_api.views import patient_aliases
from radar_api.views import patient_demographics
from radar_api.views import dialysis
from radar_api.views import genetics
from radar_api.views import hospitalisations
from radar_api.views import medications
from radar_api.views import patient_numbers
from radar_api.views import patients
from radar_api.views import plasmapheresis
from radar_api.views import posts
from radar_api.views import renal_imaging
from radar_api.views import results
from radar_api.views import salt_wasting_clinical_features
from radar_api.views import user_sessions
from radar_api.views import transplants
from radar_api.views import users
from radar_api.views import login
from radar_api.views import forgot_username
from radar_api.views import reset_password
from radar_api.views import nephrectomies
from radar_api.views import environment
from radar_api.views import recruit_patient
from radar_api.views import ins
from radar_api.views import fetal_anomaly_scans
from radar_api.views import hnf1b
from radar_api.views import fetal_ultrasounds
from radar_api.views import pregnancies
from radar_api.views import mpgn
from radar_api.views import alport
from radar_api.views import groups
from radar_api.views import group_patients
from radar_api.views import group_users
from radar_api.views import group_consultants
from radar_api.views import roles
from radar_api.auth import set_cors_headers
from radar.auth.sessions import refresh_token, current_user
from radar.database import db
from radar.template_filters import register_template_filters
from radar.config import check_config
from radar_api.debug import debug_before_request, debug_teardown_request


class RadarApi(Flask):
    def __init__(self, config=None):
        super(RadarApi, self).__init__(__name__)

        self.public_endpoints = []

        self.config.from_object('radar_api.default_settings')

        if config is None:
            self.config.from_envvar('RADAR_SETTINGS')
        else:
            self.config.update(config)

        check_config(self.config)

        db.init_app(self)

        @event.listens_for(db.session, 'before_flush')
        def before_flush(session, flush_context, instances):
            if current_user.is_authenticated():
                user_id = current_user.id

                # SET LOCAL lasts until the end of the current transaction
                # http://www.postgresql.org/docs/9.4/static/sql-set.html
                session.execute('SET LOCAL radar.user_id = :user_id', dict(user_id=user_id))

        if self.debug:
            self.after_request(set_cors_headers)

            self.before_request(debug_before_request)
            self.teardown_request(debug_teardown_request)

        if not self.debug:
            stream_handler = logging.StreamHandler()
            stream_handler.setLevel(logging.INFO)
            self.logger.addHandler(stream_handler)

        self.before_request(require_login)
        self.before_request(force_password_change)

        self.after_request(refresh_token)

        register_template_filters(self)

        alport.register_views(self)
        consultants.register_views(self)
        diagnoses.register_views(self)
        dialysis.register_views(self)
        environment.register_views(self)
        family_histories.register_views(self)
        fetal_anomaly_scans.register_views(self)
        fetal_ultrasounds.register_views(self)
        forgot_password.register_views(self)
        forgot_username.register_views(self)
        genetics.register_views(self)
        groups.register_views(self)
        group_consultants.register_views(self)
        group_patients.register_views(self)
        group_users.register_views(self)
        hnf1b.register_views(self)
        hospitalisations.register_views(self)
        ins.register_views(self)
        login.register_views(self)
        logout.register_views(self)
        medications.register_views(self)
        mpgn.register_views(self)
        nephrectomies.register_views(self)
        pathology.register_views(self)
        patient_addresses.register_views(self)
        patient_aliases.register_views(self)
        patient_consultants.register_views(self)
        patient_demographics.register_views(self)
        patient_numbers.register_views(self)
        patients.register_views(self)
        plasmapheresis.register_views(self)
        posts.register_views(self)
        pregnancies.register_views(self)
        recruit_patient.register_views(self)
        renal_imaging.register_views(self)
        reset_password.register_views(self)
        results.register_views(self)
        roles.register_views(self)
        salt_wasting_clinical_features.register_views(self)
        stats.register_views(self)
        transplants.register_views(self)
        users.register_views(self)
        user_sessions.register_views(self)

    def add_public_endpoint(self, endpoint):
        self.public_endpoints.append(endpoint)

    def is_public_endpoint(self, endpoint):
        return endpoint in self.public_endpoints


def create_app(config=None):
    app = RadarApi(config)

    return app
