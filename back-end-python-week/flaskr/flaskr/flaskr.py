import os
import sqlite3
import unittest

from flask import (Flask,  request, session, g, redirect, url_for, abort, render_template, flash)

app = Flask(__name__) # Start the instance
app.config.from_object(__name__) # Load config

# Load in default
app.config.update(
    DATABASE = os.path.join(app.root_path, "flaskr.db"),
    SECRET_KEY = '_5#y2L"F4Q8z\n\xec/',
    USERNAME = "Admin",
    PASSWORD = "Default"
)
app.config.from_envvar("FLASR_SETTINGS", silent=True)

# Connect to the database
def connect_db():
    """ Connect to the databse """
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

# Prepare db for reading
def init_db():
    db = get_db()

    with app.open_resource("schema.sql",mode='r') as f:
        db.cursor().executescript(f.read())

    db.commit()

# Confirm db init
@app.cli.command("initdb")
def initdb_command():
    """ Initializes the database """
    init_db()
    print("Initialized the databse")

# Grab that database
def get_db():
    """ Opens a new database connectionn if 
        none exists for current app context"""
    if not hasattr(g, "sqlite_db"):
        g.sqlite_db = connect_db()
    return g.sqlite_db

# Handle the end of a request
@app.teardown_appcontext
def close_db(error):
    """ Closes the database once a request finishes """
    if hasattr(g, "sqlite_db"):
        g.sqlite_db.close()

# Route for "home"
@app.route('/')
@app.route('/api')
def show_notes():
    db = get_db()
    cur = db.execute('select title, text from notes order by id desc')
    notes = cur.fetchall()
    return render_template("show_notes.html", notes=notes)

# Route for adding notes
@app.route('/api/add', methods=['POST'])
def add_note():
    if not session.get('logged_in'):
        abort(401)
    db = get_db()
    db.execute('INSERT INTO notes (title, text) VALUES (?, ?)',
            [request.form['title'], request.form['text']])
    db.commit()
    flash("New note was succesfully posted")
    return redirect(url_for('show_notes'))

# Login
@app.route('/api/login', methods=['GET','POST'])
def login():
	error = None
	if request.method == 'POST':
		if request.form['username'] != app.config['USERNAME']:
			error = "Bad Username"
		elif request.form['password'] != app.config['PASSWORD']:
			error = "Bad Password"
		else:
			session['logged_in'] = True
			flash("Successfully Logged In")
			return redirect(url_for('show_notes'))
	return render_template('login.html', error=error)

# Logout
@app.route('/api/logout')
def logout():
	session.pop('logged_in', None)
	flash("Logged Out")
	return redirect(url_for('show_notes'))

# Display Profiles
@app.route('/api/<username>')
def show_profile(username):
	flash("User Profile")
	return redirect(url_for('show_notes'))

# Test
@app.route('/api/test')
def show_test():
	flash("TEST")
	return "<h1> TEST </h1>"
	
		
