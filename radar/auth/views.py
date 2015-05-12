from flask import Blueprint, flash, redirect, request, url_for, render_template, current_app
from flask_login import login_user, logout_user, current_user
from radar.auth.forms import LoginForm
from radar.auth.services import check_login

bp = Blueprint('auth', __name__)


def require_login():
    if request.endpoint not in ['radar.index', 'auth.login', 'static'] and not current_user.is_authenticated():
        return current_app.login_manager.unauthorized()


@bp.route('/login/', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = check_login(username, password)

        if user is not None:
            login_user(user)
            flash('Logged in successfully.', 'success')
            return redirect(request.args.get('next') or url_for('radar.index'))
        else:
            form.username.errors.append('Incorrect username or password.')

    return render_template('login.html', form=form)


@bp.route('/logout/', methods=['GET', 'POST'])
def logout():
    logout_user()
    return redirect(url_for('radar.index'))